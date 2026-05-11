export const ERC8004_AGENT_REGISTRY = "0x0000000000000000000000000000000000000000"; // Placeholder

export function getAgentExecutionPayload(agentId: string, payload: any) {
  // Mock standard ERC-8004 Trustless Agent execution
  return {
    registry: ERC8004_AGENT_REGISTRY,
    agentId,
    executionData: Buffer.from(JSON.stringify(payload)).toString("hex")
  };
}
