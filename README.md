# 🌌 2048 RIFT

**2048 RIFT** is a high-performance AI Agent specialized in 2048 Rift mechanics, real-time automation, dimension management, competitive optimization, and ecosystem coordination built on Base.

---

## 🚀 Core Features & Agent Capabilities

- **Real-Time Automation:** Automated swipe calculations and dimension switching.
- **Rift Management:** Efficiently switch between multi-track instances.
- **Score Optimization:** Analyze and optimize tile placement for max score natively on Base.
- **Multi-Track Orchestration:** Synchronize and run across parallel grids.

## 🤖 2048 Rift Orchestrator Agent (ERC-8004)

This project natively operates as a hub for automated high-score orchestration via ERC-8004 AI capabilities.

- **MCP Action Endpoint:** `https://2048-rift.vercel.app/api/mcp`
- **Agent Info Endpoint:** `https://2048-rift.vercel.app/api/agent`
- **A2A Communication:** `https://2048-rift.vercel.app/.well-known/agent-card.json`

### Connecting the Agent via MCP (Model Context Protocol)

The MCP server provides structural command endpoints for orchestrating gameplay directly:

```bash
# Example cURL to test MCP Tools
curl -X POST https://2048-rift.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/list",
    "id": 1
  }'
```

Available MCP Tools logic:
- `get_race_status`
- `start_race`
- `get_leaderboard`
- `optimize_speed`
- `get_track_info`

## 🛠️ Technical Architecture

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Web3 Engine:** Wagmi, Viem, TanStack Query
- **State Machine:** Zustand 

## 📦 Local Setup & Development

To run this frontend locally on your machine:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

## 🔒 Security Practices

This repository complies with the best-practices identity and wallet structures expected in ERC-8004 A2A endpoints.
- No Sensitive Data stored in configuration.
- Stateless REST routing.
