import { createRequire } from "node:module";

// pdfjs-dist v5.x uses process.getBuiltinModule (Node 22+) to create a require
// function for loading @napi-rs/canvas. In Node 20 this method doesn't exist,
// so we shim it using createRequire from node:module.
if (!(process as any).getBuiltinModule) {
  const req = createRequire(import.meta.url);
  (process as any).getBuiltinModule = (name: string) => {
    return req(`node:${name}`);
  };
}
