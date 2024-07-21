"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const LustPress_1 = __importDefault(require("./LustPress"));
const express_1 = __importDefault(require("express"));
const endpoint_1 = __importDefault(require("./router/endpoint"));
const limit_options_1 = require("./utils/limit-options");
const logger_1 = require("./utils/logger");
const pkg = __importStar(require("../package.json"));
const lust = new LustPress_1.default();
const app = (0, express_1.default)();
app.get("/", limit_options_1.slow, limit_options_1.limiter, async (req, res) => {
    res.send({
        success: true,
        playground: "https://sinkaroid.github.io/lustpress",
        endpoint: "https://github.com/sinkaroid/lustpress/blob/master/README.md#routing",
        date: new Date().toLocaleString(),
        rss: lust.currentProccess().rss,
        heap: lust.currentProccess().heap,
        server: await lust.getServer(),
        version: `${pkg.version}`,
    });
    logger_1.logger.info({
        path: req.path,
        method: req.method,
        ip: req.ip,
        useragent: req.get("User-Agent")
    });
});
app.use((0, endpoint_1.default)());
app.use((req, res, next) => {
    res.status(404);
    next(Error(`The page not found in path ${req.url} and method ${req.method}`));
    logger_1.logger.error({
        path: req.url,
        method: req.method,
        ip: req.ip,
        useragent: req.get("User-Agent")
    });
});
app.use((error, res) => {
    res.status(500).json({
        message: error.message,
        stack: error.stack
    });
});
app.listen(process.env.PORT || 3000, () => console.log(`${pkg.name} is running on port ${process.env.PORT || 3000}`));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlCQUF1QjtBQUN2Qiw0REFBb0M7QUFDcEMsc0RBQThCO0FBRTlCLGlFQUE2QztBQUM3Qyx5REFBc0Q7QUFDdEQsMkNBQXdDO0FBQ3hDLHFEQUF1QztBQUV2QyxNQUFNLElBQUksR0FBRyxJQUFJLG1CQUFTLEVBQUUsQ0FBQztBQUM3QixNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUd0QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxvQkFBSSxFQUFFLHVCQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUM3QyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ1AsT0FBTyxFQUFFLElBQUk7UUFDYixVQUFVLEVBQUUsdUNBQXVDO1FBQ25ELFFBQVEsRUFBRSxzRUFBc0U7UUFDaEYsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFO1FBQ2pDLEdBQUcsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsR0FBRztRQUMvQixJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUk7UUFDakMsTUFBTSxFQUFFLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUM5QixPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFO0tBQzFCLENBQUMsQ0FBQztJQUNILGVBQU0sQ0FBQyxJQUFJLENBQUM7UUFDVixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7UUFDZCxNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07UUFDbEIsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1FBQ1YsU0FBUyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO0tBQ2pDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGtCQUFZLEdBQUUsQ0FBQyxDQUFDO0FBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUMxRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsOEJBQThCLEdBQUcsQ0FBQyxHQUFHLGVBQWUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM5RSxlQUFNLENBQUMsS0FBSyxDQUFDO1FBQ1gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHO1FBQ2IsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO1FBQ2xCLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRTtRQUNWLFNBQVMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztLQUNqQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFVLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDcEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDbkIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO1FBQ3RCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztLQUNuQixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSx1QkFBdUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDIn0=