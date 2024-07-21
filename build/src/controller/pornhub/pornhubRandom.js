"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomPornhub = void 0;
const pornhubGetController_1 = require("../../scraper/pornhub/pornhubGetController");
const options_1 = __importDefault(require("../../utils/options"));
const logger_1 = require("../../utils/logger");
const modifier_1 = require("../../utils/modifier");
async function randomPornhub(req, res) {
    try {
        /**
         * @api {get} /pornhub/random Random pornhub video
         * @apiName Random pornhub
         * @apiGroup pornhub
         * @apiDescription Gets random pornhub video
         *
         * @apiSuccessExample {json} Success-Response:
         *   HTTP/1.1 200 OK
         *   HTTP/1.1 400 Bad Request
         *
         * @apiExample {curl} curl
         * curl -i https://lust.scathach.id/pornhub/random
         *
         * @apiExample {js} JS/TS
         * import axios from "axios"
         *
         * axios.get("https://lust.scathach.id/pornhub/random")
         * .then(res => console.log(res.data))
         * .catch(err => console.error(err))
         *
         * @apiExample {python} Python
         * import aiohttp
         * async with aiohttp.ClientSession() as session:
         *  async with session.get("https://lust.scathach.id/pornhub/random") as resp:
         *    print(await resp.json())
         *
         */
        const url = `${options_1.default.PORNHUB}/video/random`;
        const data = await (0, pornhubGetController_1.scrapeContent)(url);
        logger_1.logger.info({
            path: req.path,
            query: req.query,
            method: req.method,
            ip: req.ip,
            useragent: req.get("User-Agent")
        });
        return res.json(data);
    }
    catch (err) {
        const e = err;
        res.status(400).json((0, modifier_1.maybeError)(false, e.message));
    }
}
exports.randomPornhub = randomPornhub;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ybmh1YlJhbmRvbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250cm9sbGVyL3Bvcm5odWIvcG9ybmh1YlJhbmRvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxxRkFBMkU7QUFDM0Usa0VBQW9DO0FBQ3BDLCtDQUE0QztBQUM1QyxtREFBa0Q7QUFFM0MsS0FBSyxVQUFVLGFBQWEsQ0FBQyxHQUFZLEVBQUUsR0FBYTtJQUM3RCxJQUFJO1FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1dBMEJHO1FBQ0gsTUFBTSxHQUFHLEdBQUcsR0FBRyxpQkFBQyxDQUFDLE9BQU8sZUFBZSxDQUFDO1FBQ3hDLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSxvQ0FBYSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLGVBQU0sQ0FBQyxJQUFJLENBQUM7WUFDVixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7WUFDZCxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7WUFDaEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO1lBQ2xCLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNWLFNBQVMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztTQUNqQyxDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE1BQU0sQ0FBQyxHQUFHLEdBQVksQ0FBQztRQUN2QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFBLHFCQUFVLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQ3BEO0FBQ0gsQ0FBQztBQTNDRCxzQ0EyQ0MifQ==