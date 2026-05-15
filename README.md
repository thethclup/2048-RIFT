# 🌌 2048 RIFT

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Base_Mainnet-blue)

**2048 RIFT** is a next-generation, dimension-bending evolution of the classic 2048 puzzle game. Instead of a single static grid, you control and strategize across multiple interconnected floating grids (Rifts) that you can rotate, swap, and merge dynamically. 

The ultimate goal: achieve maximum dimensional stability, generate exponential cross-matrix chain reactions, and permanently record your legendary scores securely on the blockchain.

---

## 🚀 Core Features

*   🌌 **Multi-Dimensional Gameplay:** Manage up to 4 interconnected game matrices synchronously.
*   🌀 **Rift Merging & Spinning:** Merge parallel dimensions for exponential point multipliers or rotate grids 90° for strategic tile repositioning.
*   💎 **"Frosted Glass" UI Aesthetic:** A deeply immersive, cyberpunk-inspired visual experience powered by Tailwind CSS and Framer Motion.
*   🔗 **Web3 & On-Chain Integration:**
    *   **SIWE (Sign-In With Ethereum):** Seamless, passwordless wallet connection.
    *   **ERC-8021:** Full transactional builder attribution logic.
    *   **Base Mainnet:** Secure, lightning-fast, and low-cost execution.
*   🤖 **AI Orchestrator Ready (ERC-8004):** Native Model Context Protocol (MCP) endpoints designed for trustless AI agent interoperability and automation strategies.

## 🎮 Game Mechanics

| Action | Control | Description |
| :--- | :--- | :--- |
| **Swipe / Move** | `W`,`A`,`S`,`D` / `Arrow Keys` | Shifts tiles within the **Active Rift** grid. |
| **Switch Rift** | `TAB` / `Click Rift` | Changes dimensional focus to a different spatial grid. |
| **Merge Rifts** | `SPACE` / `UI Button` | Combines matching tiles across all active dimensions. |
| **Spin Rift** | `UI Button` | Rotates the currently active grid 90 degrees clockwise. |

> **⚠️ Warning:** If *any single Rift* mathematically fills up completely with no valid moves left, a **Dimensional Collapse** occurs, ending your entire run. Manage all dimensions synchronously!

## 🤖 AI Agent & Integrations 

This project operates natively as a hub for automated high-score orchestration via ERC-8004 Web3 AI capabilities. 

- **Agent Identity Card:** Available publicly at `/.well-known/agent-card.json`
- **MCP Action Endpoint:** Available at `/api/mcp`
- **Agent Info Endpoint:** Available at `/api/agent`
- **Public Agent Controller (Base):** `0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6`

## 🛠️ Technical Architecture

*   **Framework:** React 19 + Vite 6
*   **Styling:** Tailwind CSS 4 (Custom CSS Variables & Backdrop Filters)
*   **Animations:** Framer Motion (Spring Physics & Layout Transitions)
*   **Web3 Engine:** Wagmi, Viem, TanStack Query
*   **State Machine:** Zustand (Immutable grid state engine)
*   **Deployment Target:** Vercel (Supports Edge/Serverless functions for `/api`)

## 📦 Setup & Development

### Local Environment Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/2048-rift.git

# 2. Install dependencies
npm install

# 3. Secure your environment
# NOTE: Never commit sensitive data! Use `.env` strictly for local testing.
cp .env.example .env

# 4. Start the development server
npm run dev
```

### Production Build

To compile the React bundle and optimize Web3 hooks:

```bash
npm run build
```

## 🔒 Security & Privacy Practices

This repository adheres to strict security guidelines:
- **No Sensitive Data:** This codebase contains **NO** private keys, custom RPC URLs with API tokens, or centralized database credentials.
- **Client-Side Validations:** State mechanics are secure and deterministic. 
- **Verifiable Identity:** Public addresses explicitly defined in configuration files (like the Agent Card) are fully public EVM identifiers and carry zero data exposure risk.

---

*Open the Rift. Elevate the Grid. Record Your Run.*
