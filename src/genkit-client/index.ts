// Add EventSource polyfill for Node.js
import { EventSource } from "eventsource";
global.EventSource = EventSource as any;

import { genkit } from "genkit";
import { mcpClient } from "genkitx-mcp";
import { googleAI, gemini20Flash } from "@genkit-ai/googleai";

// the filesystem server requires one or more allowed directories
const ALLOWED_DIRS = [process.cwd()]; // Use current working directory instead of hardcoded path

const filesystemClient = mcpClient({
  name: "filesystem",
  // Option 1: Use a local server process
  // serverProcess: {
  //   command: "npx",
  //   args: ["-y", "@modelcontextprotocol/server-everything", ...ALLOWED_DIRS],
  // },

  // Option 2: Connect to a remote server
  serverUrl: process.env.MCP_SERVER_URL || "http://localhost:3000/sse",
});

const ai = genkit({
  model: gemini20Flash,
  plugins: [
    googleAI(),
    filesystemClient /* ... other plugins such as model providers ...*/,
  ],
});

export { ai, filesystemClient };
