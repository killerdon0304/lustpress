"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchYouporn = void 0;
const youpornSearchController_1 = require("../../scraper/youporn/youpornSearchController");
const options_1 = __importDefault(require("../../utils/options"));
const logger_1 = require("../../utils/logger");
const modifier_1 = require("../../utils/modifier");
async function searchYouporn(req, res) {
    try {
        /**
         * @api {get} /youporn/search Search youporn videos
         * @apiName Search youporn
         * @apiGroup youporn
         * @apiDescription Search youporn videos
         * @apiParam {String} key Keyword to search
         * @apiParam {Number} [page=1] Page number
         *
         * @apiSuccessExample {json} Success-Response:
         *    HTTP/1.1 200 OK
         *    HTTP/1.1 400 Bad Request
         *
         * @apiExample {curl} curl
         * curl -i https://lust.scathach.id/youporn/search?key=milf
         * curl -i https://lust.scathach.id/youporn/search?key=milf&page=2
         *
         * @apiExample {js} JS/TS
         * import axios from "axios"
         *
         * axios.get("https://lust.scathach.id/youporn/search?key=milf")
         * .then(res => console.log(res.data))
         * .catch(err => console.error(err))
         *
         * @apiExample {python} Python
         * import aiohttp
         * async with aiohttp.ClientSession() as session:
         *  async with session.get("https://lust.scathach.id/youporn/search?key=milf") as resp:
         *    print(await resp.json())
         */
        const key = req.query.key;
        const page = req.query.page || 1;
        if (!key)
            throw Error("Parameter key is required");
        if (isNaN(Number(page)))
            throw Error("Parameter page must be a number");
        const url = `${options_1.default.YOUPORN}/search/?query=${(0, modifier_1.spacer)(key)}&page=${page}`;
        const data = await (0, youpornSearchController_1.scrapeContent)(url);
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
exports.searchYouporn = searchYouporn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91cG9yblNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250cm9sbGVyL3lvdXBvcm4veW91cG9yblNlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyRkFBOEU7QUFDOUUsa0VBQW9DO0FBQ3BDLCtDQUE0QztBQUM1QyxtREFBMEQ7QUFHbkQsS0FBSyxVQUFVLGFBQWEsQ0FBQyxHQUFZLEVBQUUsR0FBYTtJQUM3RCxJQUFJO1FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0E0Qkc7UUFFSCxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQWEsQ0FBQztRQUNwQyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUc7WUFBRSxNQUFNLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQ25ELElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFFLE1BQU0sS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFFeEUsTUFBTSxHQUFHLEdBQUcsR0FBRyxpQkFBQyxDQUFDLE9BQU8sa0JBQWtCLElBQUEsaUJBQU0sRUFBQyxHQUFHLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUNyRSxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsdUNBQWEsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxlQUFNLENBQUMsSUFBSSxDQUFDO1lBQ1YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO1lBQ2QsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO1lBQ2hCLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtZQUNsQixFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDVixTQUFTLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7U0FDakMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixNQUFNLENBQUMsR0FBRyxHQUFZLENBQUM7UUFDdkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBQSxxQkFBVSxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUNwRDtBQUNILENBQUM7QUFuREQsc0NBbURDIn0=