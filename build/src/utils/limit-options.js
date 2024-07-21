"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slow = exports.limiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_slow_down_1 = __importDefault(require("express-slow-down"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: "Too nasty, please slow down"
});
exports.limiter = limiter;
const slow = (0, express_slow_down_1.default)({
    delayAfter: 50,
    windowMs: 15 * 60 * 1000,
    delayMs: 1000,
    maxDelayMs: 20000,
});
exports.slow = slow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGltaXQtb3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9saW1pdC1vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUEyQztBQUMzQywwRUFBeUM7QUFFekMsTUFBTSxPQUFPLEdBQUcsSUFBQSw0QkFBUyxFQUFDO0lBQ3hCLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDeEIsR0FBRyxFQUFFLEVBQUU7SUFDUCxPQUFPLEVBQUUsNkJBQTZCO0NBQ3ZDLENBQUMsQ0FBQztBQVNNLDBCQUFPO0FBUGhCLE1BQU0sSUFBSSxHQUFHLElBQUEsMkJBQVEsRUFBQztJQUNwQixVQUFVLEVBQUUsRUFBRTtJQUNkLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7SUFDeEIsT0FBTyxFQUFFLElBQUk7SUFDYixVQUFVLEVBQUUsS0FBSztDQUNsQixDQUFDLENBQUM7QUFFZSxvQkFBSSJ9