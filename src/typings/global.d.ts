declare var __non_webpack_require__: NodeRequire;

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT: string;
  }
}
