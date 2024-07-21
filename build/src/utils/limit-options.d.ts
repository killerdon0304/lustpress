/// <reference types="qs" />
/// <reference types="express" />
declare const limiter: import("express-rate-limit").RateLimitRequestHandler;
declare const slow: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export { limiter, slow };
