declare module "highlight.js" {
  interface HLJSResult {
    value: string;
  }
  interface HLJSStatic {
    highlight(code: string, options: { language: string }): HLJSResult;
  }
  const hljs: HLJSStatic;
  export = hljs;
}
