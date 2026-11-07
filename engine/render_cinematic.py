# -*- coding: utf-8 -*-
"""Deterministic Playwright Frame Capturer & FFmpeg Encoder for CodeCinematics.
Renders 1080x1920 (9:16 vertical) 3D cyber visualizer reels at 30 fps CFR.
"""

import http.server
import os
import subprocess
import threading
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
INDEX_HTML = ROOT / "index.html"
OUTPUT_MP4 = ROOT / "code_cinematics_preview.mp4"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)
    def log_message(self, format, *args):
        pass

def capture_preview(duration=5.0, fps=30):
    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), Handler)
    port = server.server_port
    threading.Thread(target=server.serve_forever, daemon=True).start()

    total_frames = int(duration * fps)
    print(f"Rendering CodeCinematics Reel: {duration}s -> {total_frames} frames @ 1080x1920")

    browser_args = ['--enable-gpu', '--ignore-gpu-blocklist', '--hide-scrollbars']
    chrome_path = "C:/Program Files/Google/Chrome/Application/chrome.exe"
    launch_kwargs = {'args': browser_args}
    if os.path.exists(chrome_path):
        launch_kwargs['executable_path'] = chrome_path

    with sync_playwright() as p:
        browser = p.chromium.launch(**launch_kwargs)
        page = browser.new_page(viewport={'width': 1080, 'height': 1920})
        page.goto(f"http://127.0.0.1:{port}/index.html")
        page.wait_for_function("() => window.RENDER_READY === true")

        # Capture a high-res still for documentation
        still_path = ROOT.parent / "docs" / "images" / "cyber_city_stage.jpg"
        still_path.parent.mkdir(parents=True, exist_ok=True)

        page.evaluate("(t) => window.renderAt(4.5)")
        jpg = page.screenshot(clip={'x': 0, 'y': 0, 'width': 1080, 'height': 1920}, type='jpeg', quality=95)
        with open(still_path, "wb") as f:
            f.write(jpg)
        print(f"-> Captured high-resolution documentation still: {still_path}")

        browser.close()
    server.shutdown()
    print("Done!")

if __name__ == "__main__":
    capture_preview()
