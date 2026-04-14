import './style.css';
import * as THREE from 'three';
import { logAudit } from './supabase';

// --- 3D Visual Rendering (Three.js) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '-1';
renderer.domElement.style.opacity = '0.5';
renderer.domElement.classList.add('pointer-events-none');
document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(12, 3, 150, 20);
const material = new THREE.MeshBasicMaterial({ color: 0x00F5A0, wireframe: true, transparent: true, opacity: 0.2 });
const abstractShape = new THREE.Mesh(geometry, material);
scene.add(abstractShape);

camera.position.z = 30;

function animate() {
  requestAnimationFrame(animate);
  abstractShape.rotation.x += 0.002;
  abstractShape.rotation.y += 0.003;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// --- UI Elements ---
const inputEl = document.getElementById('meal-input');
const runBtn = document.getElementById('run-audit-btn');
const loadingState = document.getElementById('loading-state');
const outputPanel = document.getElementById('output-panel');
const errorPanel = document.getElementById('error-panel');
const personaBtns = document.querySelectorAll('#persona-filters button');
const mediaUploadEl = document.getElementById('media-upload');
const uploadStatusEl = document.getElementById('upload-status');

// --- Output Elements ---
const outPerceptionText = document.getElementById('out-perception-text');
const outRealityText = document.getElementById('out-reality-text');
const outRealityInsulin = document.getElementById('out-reality-insulin');
const outRealityLiver = document.getElementById('out-reality-liver');
const outImpactText = document.getElementById('out-impact-text');
const outFixText = document.getElementById('out-fix-text');
const outWhyText = document.getElementById('out-why-text');
const errorText = document.getElementById('error-text');

let activePersona = 'General';
let currentBase64Image = null;

// --- Vision Prompt Definition ---
const VISION_PROMPT = `You are an expert nutritionist and computer vision assistant.
Your task is to analyze an uploaded food image and extract structured, reliable information that can be used for a metabolic audit.

[FOOD IDENTIFICATION]
List the main food items detected in the image
[INGREDIENT BREAKDOWN]
List key ingredients (approximate if needed)
[MEAL CATEGORY]
Classify the meal (e.g., High-carb breakfast, Processed snack, Balanced meal, Sugary beverage, etc.)
[NUTRITIONAL FLAGS]
Highlight key concerns or traits: High sugar, Low protein, High sodium, Refined carbs, High fat, Balanced

Focus on practical interpretation, not perfect accuracy. Your output should make the system understand: "What exactly is being eaten and what are its key nutritional characteristics"`;

// --- File Upload Logic ---
mediaUploadEl.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) {
     currentBase64Image = null;
     uploadStatusEl.classList.add('hidden');
     return;
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    const b64 = event.target.result.split(',')[1];
    currentBase64Image = {
        inlineData: {
            data: b64,
            mimeType: file.type
        }
    };
    uploadStatusEl.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
});

// --- UI Agent: Personas ---
personaBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    personaBtns.forEach(b => {
      b.classList.remove('bg-primary-container', 'text-on-primary', 'border-primary-container');
      b.classList.add('text-on-surface-variant', 'border-outline-variant');
    });
    btn.classList.add('bg-primary-container', 'text-on-primary', 'border-primary-container');
    btn.classList.remove('text-on-surface-variant', 'border-outline-variant');
    activePersona = btn.dataset.persona;
  });
});

// --- Logic Agent: Execute Audit ---
runBtn.addEventListener('click', async () => {
  let query = inputEl.value.trim();
  if (!query && !currentBase64Image) return;

  // 1. Enter Loading State
  loadingState.classList.remove('hidden');
  outputPanel.classList.add('hidden');
  errorPanel.classList.add('hidden');

  try {
    // 2. Dual-Agent Execution
    // Stage 1: Vision Extraction
    if (currentBase64Image) {
        query = await fetchVision(currentBase64Image);
        console.log("Stage 1 Vision Extraction Output:", query);
    }

    // Stage 2: Reasoning Engine
    const result = await fetchAudit(query, activePersona);
    
    // 3. Telemetry: Log securely to Supabase
    await logAudit(query, activePersona, result);
    
    // 4. UI Agent: Render Results
    renderAudit(result);
    
    loadingState.classList.add('hidden');
    outputPanel.classList.remove('hidden');
  } catch (err) {
    loadingState.classList.add('hidden');
    errorPanel.classList.remove('hidden');
    errorText.textContent = "Audio/Visual Audit Error: " + err.message;
    console.error("MealAudit Complete Error: ", err);
  }
});

// --- Stage 1 Vision Agent Fetch ---
async function fetchVision(inlineImageData) {
  const response = await fetch('/api/audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: VISION_PROMPT },
          inlineImageData
        ]
      }]
    })
  });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Vision API Exception: ${response.status} - ${errorBody}`);
  }
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// --- Stage 2 AI Reasoner Fetch ---
async function fetchAudit(query, persona) {
  const response = await fetch('/api/audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ 
          text: `You are an empathetic, highly knowledgeable Personal Nutritionist. Analyze this specific meal context: "${query}" for a ${persona} profile. Provide a JSON response mapping strictly to these keys: "perception", "biological_reality_text", "biological_insulin", "biological_liver", "immediate_impact", "fix_pivot", "why_it_works". Tone should be engaging, warmly supportive, yet scientifically precise to guide them to better metabolic health. Frame the "fix_pivot" as an easy, delicious hack.` 
        }]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`API Exception: ${response.status} - ${errorBody}`);
  }
  const data = await response.json();
  let textPayload = data.candidates[0].content.parts[0].text;
  
  textPayload = textPayload.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(textPayload);
}

// --- Logic Agent: Mapper ---
function renderAudit(data) {
  outPerceptionText.textContent = data.perception;
  outRealityText.textContent = data.biological_reality_text;
  outRealityInsulin.textContent = data.biological_insulin;
  outRealityLiver.textContent = data.biological_liver;
  outImpactText.textContent = data.immediate_impact;
  outFixText.textContent = `"${data.fix_pivot}"`;
  outWhyText.textContent = data.why_it_works;
}
