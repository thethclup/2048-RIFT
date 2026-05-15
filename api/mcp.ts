// api/mcp.ts
// Exporting standard Web Request/Response API handlers for Vercel Edge/Serverless Functions

export const config = {
  runtime: 'edge', // Vercel Edge Runtime support
};

export default async function handler(req: Request) {
  if (req.method === 'GET') {
    return Response.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "2048 Rift MCP Endpoint",
      status: "active",
      description: "Active MCP server for 2048 Rift Orchestrator Agent",
      capabilities: ["2048-mechanics", "rift-merging", "tile-orchestration"],
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    try {
      const body = await req.json();
      
      return Response.json({
        status: "success",
        agent: "2048 Rift Orchestrator",
        response: {
          success: true,
          message: "Command executed successfully",
          data: body
        },
        receivedAt: new Date().toISOString()
      });
    } catch (error) {
      return Response.json({ 
        status: "error", 
        message: "Invalid MCP request" 
      }, { status: 400 });
    }
  }

  return Response.json({ error: "Method not allowed" }, { status: 405 });
}
