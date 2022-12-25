export interface Context {
  requestId: string;
}

export interface Secrets {
  PORT: string;
  PG_HOST: string;
  PG_PORT: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  API_KEY: string;
  SKYWALLET_BASE_URL: string;
  ALCHEMY_POLYGON_MUMBAI_API_KEY: string;
  ALCHEMY_POLYGON_MAINNET_API_KEY: string;
  ALCHEMY_ETHEREUM_MAINNET_API_KEY: string;
  ALCHEMY_ETHEREUM_GOERLI_API_KEY: string;
  NEAR_NETWORK_ID:string;
  NEAR_NODE_URL:string;
  NEAR_WALLET_URL:string;
  NEAR_HELPER_URL:string;
  DISCORD_GATING_BOT_URL:string;
  DISCORD_GATING_BOT_API_KEY:string;
}
