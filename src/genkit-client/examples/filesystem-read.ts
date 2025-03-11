import { ai } from "../index.js";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const MCP_CONTAINER_NAME = process.env.MCP_CONTAINER_NAME || "mcp-filesystem";

async function main() {
  try {
    // Start podman container
    console.log("Starting podman container...");
    await execAsync(`podman start ${MCP_CONTAINER_NAME}`);
    console.log("Podman container started");

    // Run the prompt
    console.log("Running...");
    await ai.generate({
      prompt: `read the file at sandbox/file.txt`,
      tools: ["filesystem/read_file"],
    });
    console.log("Done");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Stop podman container
    try {
      console.log("Stopping podman container...");
      await execAsync(`podman stop ${MCP_CONTAINER_NAME}`);
      console.log("Podman container stopped");
    } catch (stopError) {
      console.error("Error stopping container:", stopError);
    }
  }
}

main().catch(console.error);
