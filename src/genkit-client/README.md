# GenKit Client for MCP Servers

This package provides a GenKit client configured to work with Model Context Protocol (MCP) servers.

## Usage

```typescript
import { ai } from "@mcp-servers/genkit-client";

// Use the AI client with filesystem access
const result = await ai.generate({
  messages: [{ role: "user", content: "Read the file at sandbox/file.txt" }],
  tools: ["filesystem/read_file"],
});
```

## Configuration

By default, the client is configured to connect to a remote MCP server using the URL specified in the `MCP_SERVER_URL` environment variable, or falling back to `http://localhost:3000/sse` if not specified.

## Available Tools

The MCP filesystem client provides the following tools based on the actual implementation:

### File Reading and Writing

- `read_file`: Read the contents of a file
- `read_multiple_files`: Read the contents of multiple files at once
- `write_file`: Write content to a file, creating it if it doesn't exist
- `edit_file`: Apply edits to an existing file

### Directory Operations

- `create_directory`: Create a new directory (and parent directories if needed)
- `list_directory`: List the contents of a directory
- `directory_tree`: Get a hierarchical tree representation of a directory
- `list_allowed_directories`: List all directories the server is allowed to access

### File Management

- `move_file`: Move or rename a file
- `get_file_info`: Get metadata about a file (size, dates, permissions)

### Search and Execute

- `search_files`: Search for files matching a pattern
- `execute_file`: Execute a file and capture its output
