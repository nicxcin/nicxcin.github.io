from http.server import HTTPServer, BaseHTTPRequestHandler

class WebhookHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8")
        print("\n--- Caught Request from GitHub Actions! ---")
        print(body)
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"OK")

server = HTTPServer(("localhost", 8080), WebhookHandler)
print("Listening on port 8080...")
server.serve_forever()
