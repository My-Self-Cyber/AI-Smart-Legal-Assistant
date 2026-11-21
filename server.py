"""
AI Smart Legal Assistant - Local Demonstration Server
Evaluation 2 (7th Semester) | COMSATS University Islamabad, Vehari Campus
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 5000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Clean terminal logging
        sys.stderr.write(f"[{self.log_date_time_string()}] {format % args}\n")

def run():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}/index.html"
        print("=" * 70)
        print("  AI SMART LEGAL ASSISTANT - 40% FRONTEND SERVER")
        print("  COMSATS University Islamabad, Vehari Campus")
        print("=" * 70)
        print(f"  Server running at: {url}")
        print("  Serving modules:")
        print("    1. User Registration & Login (FR-1.1, FR-1.2)")
        print("    2. User Intelligence Dashboard (FR-1.3)")
        print("    3. AI Legal Chat & RAG Engine (FR-2.1–FR-2.5)")
        print("    4. Personal History & Transcripts (FR-4.1, FR-4.2)")
        print("    5. Admin Knowledge Ingestion Portal (FR-3.1–FR-3.3)")
        print("=" * 70)
        print("  Opening browser automatically... (Press Ctrl+C to stop)")
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server. Goodbye!")

if __name__ == "__main__":
    run()
