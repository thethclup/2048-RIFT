import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    protocol: "MCP",
    version: "1.0.0",
    name: "2048 Rift MCP Endpoint",
    status: "active",
    description: "Active MCP server for 2048 Rift Orchestrator Agent",
    capabilities: {
      tools: {},
      prompts: {},
      resources: {}
    },
    tools: [
      {
        name: "merge_rifts",
        description: "Trigger a cross-dimensional merge of active rifts",
        input_schema: { type: "object", properties: {} }
      },
      {
        name: "spin_dimension",
        description: "Rotate internal grid dimensions 90 degrees",
        input_schema: { type: "object", properties: {} }
      }
    ],
    prompts: [],
    resources: [],
    timestamp: new Date().toISOString()
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, command, params, jsonrpc, method, id } = body;

    let result: any = {};

    // Standard MCP JSON-RPC handling
    if (jsonrpc === "2.0" && method) {
      if (method === "tools/list") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id: id,
          result: {
            tools: [
              {
                name: "merge_rifts",
                description: "Trigger a cross-dimensional merge of active rifts",
                inputSchema: { type: "object", properties: {} }
              },
              {
                name: "spin_dimension",
                description: "Rotate internal grid dimensions 90 degrees",
                inputSchema: { type: "object", properties: {} }
              }
            ]
          }
        });
      } else if (method === "prompts/list") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id: id,
          result: { prompts: [] }
        });
      } else if (method === "resources/list") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id: id,
          result: { resources: [] }
        });
      } else if (method === "initialize") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id: id,
          result: {
            protocolVersion: "2024-11-05",
            capabilities: { tools: {}, prompts: {}, resources: {} },
            serverInfo: { name: "2048 Rift Orchestrator", version: "1.0.0" }
          }
        });
      }
    }

    if (action === "status" || command === "status" || action === "ping" || command === "ping") {
      result = { status: "online", agent: "2048 Rift Orchestrator", message: "Rift is open - Ready to slide!" };
    } else if (action === "get_info" || command === "get_info") {
      result = { name: "2048 Rift Orchestrator", wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6", platform: "Base", version: "1.0.0" };
    } else {
      result = { success: true, action: command || params || action, executedAt: new Date().toISOString(), message: "Rift move executed successfully" };
    }

    return NextResponse.json({
      status: "success",
      agent: "2048 Rift Orchestrator",
      response: result,
      receivedAt: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Failed to process MCP command" }, { status: 400 });
  }
}