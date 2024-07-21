"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomYouporn = void 0;
const youpornGetController_1 = require("../../scraper/youporn/youpornGetController");
const options_1 = __importDefault(require("../../utils/options"));
const logger_1 = require("../../utils/logger");
const modifier_1 = require("../../utils/modifier");
const cheerio_1 = require("cheerio");
const LustPress_1 = __importDefault(require("../../LustPress"));
const lust = new LustPress_1.default();
async function randomYouporn(req, res) {
    try {
        /**
         * @api {get} /youporn/random Get random youporn
         * @apiName Get random youporn
         * @apiGroup youporn
         * @apiDescription Get a random youporn video
         *
         * @apiSuccessExample {json} Success-Response:
         *   HTTP/1.1 200 OK
         *   HTTP/1.1 400 Bad Request
         *
         * @apiExample {curl} curl
         * curl -i https://lust.scathach.id/youporn/random
         *
         * @apiExample {js} JS/TS
         * import axios from "axios"
         *
         * axios.get("https://lust.scathach.id/youporn/random")
         * .then(res => console.log(res.data))
         * .catch(err => console.error(err))
         *
         * @apiExample {python} Python
         * import aiohttp
         * async with aiohttp.ClientSession() as session:
         *  async with session.get("https://lust.scathach.id/youporn/random") as resp:
         *    print(await resp.json())
         */
        const resolve = await lust.fetchBody(`${options_1.default.YOUPORN}`);
        const $ = (0, cheerio_1.load)(resolve);
        const search = $("a[href^='/watch/']")
            .map((i, el) => {
            return $(el).attr("href");
        }).get();
        const random = Math.floor(Math.random() * search.length);
        const url = options_1.default.YOUPORN + search[random];
        const data = await (0, youpornGetController_1.scrapeContent)(url);
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
exports.randomYouporn = randomYouporn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91cG9yblJhbmRvbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250cm9sbGVyL3lvdXBvcm4veW91cG9yblJhbmRvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxRkFBMkU7QUFDM0Usa0VBQW9DO0FBQ3BDLCtDQUE0QztBQUM1QyxtREFBa0Q7QUFFbEQscUNBQStCO0FBQy9CLGdFQUF3QztBQUV4QyxNQUFNLElBQUksR0FBRyxJQUFJLG1CQUFTLEVBQUUsQ0FBQztBQUV0QixLQUFLLFVBQVUsYUFBYSxDQUFDLEdBQVksRUFBRSxHQUFhO0lBQzdELElBQUk7UUFHRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQXlCRztRQUNILE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLGlCQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNyRCxNQUFNLENBQUMsR0FBRyxJQUFBLGNBQUksRUFBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsb0JBQW9CLENBQUM7YUFDbkMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ2IsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1gsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pELE1BQU0sR0FBRyxHQUFHLGlCQUFDLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsb0NBQWEsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxlQUFNLENBQUMsSUFBSSxDQUFDO1lBQ1YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO1lBQ2QsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO1lBQ2hCLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtZQUNsQixFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDVixTQUFTLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7U0FDakMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixNQUFNLENBQUMsR0FBRyxHQUFZLENBQUM7UUFDdkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBQSxxQkFBVSxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUNwRDtBQUNILENBQUM7QUFuREQsc0NBbURDIn0=