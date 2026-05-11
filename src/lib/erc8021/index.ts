export const ERC8021_ATTRIBUTION = "ATTRIBUTION_CODE";
export const ERC8021_BUILDER = "bc_4pftcpgk";

export function generateAttributionPayload(action: string, metadata?: Record<string, any>) {
  return {
    standard: "ERC-8021",
    attribution: ERC8021_ATTRIBUTION,
    builder: ERC8021_BUILDER,
    action,
    timestamp: Date.now(),
    ...metadata
  };
}
