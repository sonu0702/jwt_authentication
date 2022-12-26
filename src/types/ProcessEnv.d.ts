declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    NODE_ENV: string;
    PG_HOST: string;
    PG_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    API_KEY: string;
    JWT_TOKEN_PRIVATE_KEY: string;
    JWT_TOKEN_EXPIRED_IN: string;
  }
}