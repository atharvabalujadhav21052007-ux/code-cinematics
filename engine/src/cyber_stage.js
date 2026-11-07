// CodeCinematics Three.js 3D Cyber Stage Engine
const W = 1080;
const H = 1920;

const canvas = document.getElementById('c');
canvas.width = W;
canvas.height = H;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(W, H);
renderer.setPixelRatio(1);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.35;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x020617, 0.045);

const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
camera.position.set(0, 8, 14);
camera.lookAt(0, 1.5, 0);

// 1. Lighting
const ambient = new THREE.AmbientLight(0x0f172a, 1.5);
scene.add(ambient);

const cyanLight = new THREE.PointLight(0x06b6d4, 4.0, 30);
cyanLight.position.set(-6, 8, 4);
scene.add(cyanLight);

const purpleLight = new THREE.PointLight(0xa855f7, 4.5, 30);
purpleLight.position.set(6, 6, -4);
scene.add(purpleLight);

// 2. Cyber Grid Floor
const gridHelper = new THREE.GridHelper(40, 40, 0x06b6d4, 0x1e293b);
gridHelper.position.y = -0.01;
scene.add(gridHelper);

// 3. Procedural Holographic Code Towers
const towers = [];
const towerCount = 18;
const towerMat = new THREE.MeshPhysicalMaterial({
  color: 0x090d16,
  metalness: 0.85,
  roughness: 0.2,
  transmission: 0.6,
  transparent: true,
  opacity: 0.85,
  reflectivity: 0.9,
  clearcoat: 1.0
});

const coreMat = new THREE.MeshBasicMaterial({
  color: 0x38bdf8,
  wireframe: true
});

const emeraldMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
const crimsonMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

for (let i = 0; i < towerCount; i++) {
  const angle = (i / towerCount) * Math.PI * 2 + (Math.random() * 0.2);
  const radius = 2.5 + Math.random() * 5.5;
  const height = 1.5 + Math.random() * 6.0;
  const width = 0.6 + Math.random() * 0.8;

  const towerGeo = new THREE.BoxGeometry(width, height, width);
  const tower = new THREE.Mesh(towerGeo, towerMat);

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  tower.position.set(x, height * 0.5, z);

  // Wireframe edges for cyber aesthetic
  const wireGeo = new THREE.EdgesGeometry(towerGeo);
  const wireMat = new THREE.LineBasicMaterial({
    color: i % 2 === 0 ? 0x06b6d4 : 0xa855f7,
    linewidth: 2
  });
  const wire = new THREE.LineSegments(wireGeo, wireMat);
  tower.add(wire);

  // Internal glowing core
  const coreGeo = new THREE.BoxGeometry(width * 0.4, height * 0.8, width * 0.4);
  const core = new THREE.Mesh(coreGeo, coreMat);
  tower.add(core);

  scene.add(tower);
  towers.push({ mesh: tower, baseHeight: height, speed: 0.5 + Math.random() * 0.8 });
}

// 4. Fiber-Optic Laser Highways
const laserCurves = [];
for (let i = 0; i < 8; i++) {
  const tA = towers[i].mesh.position;
  const tB = towers[(i + 4) % towerCount].mesh.position;
  const mid = new THREE.Vector3(
    (tA.x + tB.x) * 0.5,
    Math.max(tA.y, tB.y) + 1.2 + Math.random(),
    (tA.z + tB.z) * 0.5
  );

  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(tA.x, tA.y + 0.5, tA.z),
    mid,
    new THREE.Vector3(tB.x, tB.y + 0.5, tB.z)
  );

  const points = curve.getPoints(40);
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({
    color: i % 2 === 0 ? 0x38bdf8 : 0xc084fc,
    transparent: true,
    opacity: 0.75
  });
  const line = new THREE.Line(geo, mat);
  scene.add(line);

  // Pulsing laser packet
  const packet = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), emeraldMat);
  scene.add(packet);

  laserCurves.push({ curve, packet, offset: Math.random() });
}

// 5. Matrix Digital Particle Rain
const particleCount = 600;
const particleGeo = new THREE.BufferGeometry();
const particlePos = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
  particlePos[i] = (Math.random() - 0.5) * 30;
  particlePos[i + 1] = Math.random() * 15;
  particlePos[i + 2] = (Math.random() - 0.5) * 30;
}
particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
const particleMat = new THREE.PointsMaterial({
  color: 0x06b6d4,
  size: 0.12,
  transparent: true,
  opacity: 0.65
});
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

// Animation Driver
window.renderAt = function(t) {
  // 1. Camera choreography: smooth orbital spiral
  const camAngle = t * 0.22;
  const camDist = 11.5 + Math.sin(t * 0.4) * 2.5;
  const camHeight = 6.5 + Math.cos(t * 0.35) * 2.2;
  camera.position.set(
    Math.sin(camAngle) * camDist,
    camHeight,
    Math.cos(camAngle) * camDist
  );
  camera.lookAt(0, 2.0, 0);

  // 2. Pulse laser packets along spline highways
  laserCurves.forEach((lc, idx) => {
    const progress = (t * 0.8 + lc.offset) % 1.0;
    const pt = lc.curve.getPoint(progress);
    lc.packet.position.copy(pt);
    lc.packet.scale.setScalar(0.8 + Math.sin(t * 6 + idx) * 0.3);
  });

  // 3. Ambient data rain fall
  const posArr = particles.geometry.attributes.position.array;
  for (let i = 1; i < particleCount * 3; i += 3) {
    posArr[i] -= 0.08;
    if (posArr[i] < 0) posArr[i] = 15;
  }
  particles.geometry.attributes.position.needsUpdate = true;

  // 4. Floating HUD updates
  const subEl = document.getElementById('subtitles');
  const statMain = document.getElementById('stat-main');
  const statSub = document.getElementById('stat-sub');

  if (t < 5.0) {
    subEl.innerHTML = '<span class="hl">ANALYZING</span> AST ARCHITECTURE';
    statMain.innerText = '14.8k AST NODES';
    statSub.innerText = 'Resolving Dependency Graph';
  } else if (t < 12.0) {
    subEl.innerHTML = '<span class="hl">DETECTING</span> BOTTLENECKS & HOTPATHS';
    statMain.innerText = '142ms LATENCY';
    statSub.innerText = 'High Memory Churn in Loop Buffer';
  } else if (t < 20.0) {
    subEl.innerHTML = '<span class="hl">REFACTORING</span> ASYNC PIPELINE';
    statMain.innerText = '+842 / -1,230 LOC';
    statSub.innerText = 'Eliminating Redundant Allocations';
  } else if (t < 28.0) {
    subEl.innerHTML = '<span class="hl">OPTIMIZATION</span> COMPLETED';
    statMain.innerText = '18ms LATENCY';
    statSub.innerText = '-87% Execution Time Improvement';
  } else {
    subEl.innerHTML = '<span class="hl">PRODUCTION</span> RELEASE READY';
    statMain.innerText = 'ZERO REGRESSIONS';
    statSub.innerText = '100% Test Suite Green';
  }

  renderer.render(scene, camera);
};

// Responsive viewport fitting for local preview
function resize() {
  const scale = Math.min(window.innerWidth / W, window.innerHeight / H);
  const stage = document.getElementById('stage');
  stage.style.transform = `scale(${scale})`;
  stage.style.left = `${(window.innerWidth - W * scale) / 2}px`;
  stage.style.top = `${(window.innerHeight - H * scale) / 2}px`;
}
window.addEventListener('resize', resize);
resize();

// Preview loop
let start = performance.now();
function animate() {
  if (!window.RENDER_MODE) {
    const elapsed = (performance.now() - start) / 1000;
    window.renderAt(elapsed);
    requestAnimationFrame(animate);
  }
}
animate();
window.RENDER_READY = true;
