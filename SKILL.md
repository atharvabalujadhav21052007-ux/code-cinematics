---
name: code-cinematics
description: Studio-grade skill to transform any Git repository, commit diff, or software architecture into a viral 3D cyberpunk vertical explainer reel (9:16 vertical, 1080x1920). Turns code into a glowing 3D cybernetic city where files are holographic towers, functions are crystalline nodes, data flows through pulsing laser highways, and git commits detonate emerald addition shockwaves and crimson deletion purges.
---

# CodeCinematics — Git & Codebase to 3D Cyber Reel Engine

Transform raw code, git history, or technical architecture into high-energy, viral 3D motion graphics reels tailored for developer audiences, GitHub release showcases, Twitter/X tech launches, and YouTube Shorts.

## 🎬 Cinematic Aesthetic & Visual Grammar

### 1. The "Cyber City" Code Metaphor
- **Directory / Module = Cyber District**: Modules form interconnected floating geometric platforms over an infinite reflective dark grid floor.
- **File = Holographic Tower**: Files are translucent glass skyscrapers whose height is proportional to Lines of Code (LOC) and complexity.
- **Function / Method = Crystalline Core Node**: Key functions pulsate with internal glowing energy cores (Cyan for services, Amber for controllers, Violet for databases).
- **Data Pipeline = Fiber-Optic Laser Highway**: Function calls and imports shoot high-speed laser pulses across glowing spline curves between towers.
- **Git Commit Diff = Energy Detonation**:
  - `+` Additions: Emerald green particle shockwaves construct new crystalline structures block by block.
  - `-` Deletions / Refactors: Crimson red digital disintegration wipes out obsolete blocks with volumetric smoke.

### 2. Camera Direction (The Hollywood Hacker Style)
- **Framing**: Strict 9:16 vertical orientation ($1080 \times 1920$) optimized for mobile reels.
- **Dynamic Moves**:
  - **The Dive (0-4s)**: Rapid vertical drop through cyber clouds into the central codebase hub.
  - **The Spiral Inspection (4-15s)**: Cinematic $360^\circ$ orbital sweep around a refactored class or new architecture layer.
  - **The Macro Punch-In (15-25s)**: Extreme close-up on a glowing function signature as lines of code stream past like the Matrix digital rain.
  - **The Pullback Climax (25-35s)**: Dramatic wide angle revealing the entire upgraded system humming at full power with real-time performance HUD overlay.

### 3. Floating Holographic HUD
- **Git Commit Hash Pill**: Top-left glowing cyan pill displaying branch, commit hash, and author badge.
- **Diff Telemetry**: Live counter ticking `+842 LOC / -1,230 LOC` (Refactor Efficiency).
- **Latency & Speedometer**: Real-time benchmarks counting down (e.g. `142ms -> 18ms (-87%)`).
- **Kinetic Terminal Subtitles**: Crisp monospace typography with drop-shadow glow and syntax-highlighted keywords.

---

## 🛠️ Step-by-Step Generation Workflow

When the user runs `/code-cinematics` or asks to visualize their codebase/git diff:

1. **Step 1: Parse Git AST / Architecture**:
   - Run `python engine/git_ast_analyzer.py --repo . --since "HEAD~5"`
   - Extracts modified files, function call graphs, complexity metrics, and diff deltas into `scene_manifest.json`.

2. **Step 2: Synthesize Technical Voiceover**:
   - Formulate a 5-beat engineering script:
     - Beat 1: The Bottleneck / Legacy Problem (Why the old code failed)
     - Beat 2: The Core Architectural Decision (What was redesigned)
     - Beat 3: The Implementation (Dive into the critical algorithm/function)
     - Beat 4: The Benchmark (Latency drops, memory optimization, LOC reduction)
     - Beat 5: The Impact / Call-to-Action (Release tag, star on GitHub)
   - Generate audio via TTS (Gemini / ElevenLabs) leveled to -14 LUFS.

3. **Step 3: WebGL 3D Choreography**:
   - Assemble `engine/index.html` with procedural towers, laser splines, and bloom shaders.
   - Sync camera keyframes directly to voiceover word timestamps.

4. **Step 4: Deterministic 1080x1920 GPU Render**:
   - Run `python engine/render_cinematic.py --out release_reel.mp4`
   - Produces 1080x1920 30fps CFR H.264 video with synchronized audio.
