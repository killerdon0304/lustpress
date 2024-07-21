"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
exports.logger = (0, pino_1.default)({
    level: "info",
    transport: {
        target: "pino-pretty"
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnREFBd0I7QUFFWCxRQUFBLE1BQU0sR0FBRyxJQUFBLGNBQUksRUFBQztJQUN6QixLQUFLLEVBQUUsTUFBTTtJQUNiLFNBQVMsRUFBRTtRQUNULE1BQU0sRUFBRSxhQUFhO0tBQ3RCO0NBQ0YsQ0FBQyxDQUFDIn0=