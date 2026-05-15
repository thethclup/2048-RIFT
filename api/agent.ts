// api/agent.ts

export const config = {
  runtime: 'edge',
};

export default function handler() {
  return Response.json({
    name: "2048 Rift Orchestrator",
    status: "active",
    wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
    platform: "2048 Rift",
    version: "1.0.0"
  });
}
