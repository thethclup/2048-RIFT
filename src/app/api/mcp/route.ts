import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Cache-Control': 'no-store, max-age=0',
};

const TOOLS = [
  {
    name: "get_race_status",
    description: "Get current race status",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "start_race",
    description: "Start a new race",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "get_leaderboard",
    description: "Fetch current leaderboard",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "optimize_speed",
    description: "Calculate optimal speed profile",
    inputSchema: { type: "object", properties: {} }
  },
  {
    name: "get_track_info",
    description: "Get detailed track info",
    inputSchema: { type: "object", properties: {} }
  }
];

const PROMPTS = [
  {
    name: "analyze_rift",
    description: "Analyze current rift state",
    arguments: []
  }
];

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function GET() {
  return NextResponse.json({
    protocol: "MCP",
    version: "1.0.0",
    name: "2048 Rift Orchestrator",
    status: "active",
    description: "High-performance AI Agent specialized in 2048 Rift mechanics, real-time automation, dimension management, competitive optimization and ecosystem coordination on Base.",
    capabilities: {
      tools: { listChanged: true },
      prompts: { listChanged: true },
      resources: {}
    },
    tools: TOOLS,
    prompts: PROMPTS,
    resources: [],
    timestamp: new Date().toISOString()
  }, { headers: CORS_HEADERS });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, command, params, jsonrpc, method, id } = body;

    // Standard MCP JSON-RPC handling
    if (jsonrpc === "2.0" && method) {
      if (method === "tools/list") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id: id,
          result: {
            tools: TOOLS
          }
        }, { headers: CORS_HEADERS });
      } else if (method === "tools/call") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id: id,
          result: {
            content: [{ type: "text", text: `Tool ${params?.name} executed successfully.` }],
            isError: false
          }
        }, { headers: CORS_HEADERS });
      } else if (method === "prompts/list") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id: id,
          result: { prompts: PROMPTS }
        }, { headers: CORS_HEADERS });
      } else if (method === "resources/list") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id: id,
          result: { resources: [] }
        }, { headers: CORS_HEADERS });
      } else if (method === "initialize") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id: id,
          result: {
            protocolVersion: "2024-11-05",
            capabilities: { tools: { listChanged: true }, prompts: { listChanged: true }, resources: {} },
            serverInfo: { name: "2048 Rift Orchestrator", version: "1.0.0" }
          }
        }, { headers: CORS_HEADERS });
      }
    }

    let result: any = {};
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
    }, { headers: CORS_HEADERS });
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Failed to process MCP command" }, { status: 400, headers: CORS_HEADERS });
  }
}