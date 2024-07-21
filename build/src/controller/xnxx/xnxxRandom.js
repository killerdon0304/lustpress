"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomXnxx = void 0;
const xnxxGetController_1 = require("../../scraper/xnxx/xnxxGetController");
const options_1 = __importDefault(require("../../utils/options"));
const logger_1 = require("../../utils/logger");
const modifier_1 = require("../../utils/modifier");
const cheerio_1 = require("cheerio");
const LustPress_1 = __importDefault(require("../../LustPress"));
const lust = new LustPress_1.default();
async function randomXnxx(req, res) {
    try {
        /**
         * @api {get} /xnxx/random Get random xnxx
         * @apiName Get random xnxx
         * @apiGroup xnxx
         * @apiDescription Get a random xnxx video
         *
         * @apiSuccessExample {json} Success-Response:
         *   HTTP/1.1 200 OK
         *   HTTP/1.1 400 Bad Request
         *
         * @apiExample {curl} curl
         * curl -i https://lust.scathach.id/xnxx/random
         *
         * @apiExample {js} JS/TS
         * import axios from "axios"
         *
         * axios.get("https://lust.scathach.id/xnxx/random")
         * .then(res => console.log(res.data))
         * .catch(err => console.error(err))
         *
         * @apiExample {python} Python
         * import aiohttp
         * async with aiohttp.ClientSession() as session:
         *  async with session.get("https://lust.scathach.id/xnxx/random") as resp:
         *    print(await resp.json())
         */
        const resolve = await lust.fetchBody("https://www.xnxx.com/search/random/random");
        const $ = (0, cheerio_1.load)(resolve);
        const search = $("div.mozaique > div")
            .map((i, el) => {
            return $(el).find("a").attr("href");
        }).get();
        const random = Math.floor(Math.random() * search.length);
        const url = options_1.default.XNXX + search[random];
        const data = await (0, xnxxGetController_1.scrapeContent)(url);
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
exports.randomXnxx = randomXnxx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG54eFJhbmRvbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250cm9sbGVyL3hueHgveG54eFJhbmRvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUU7QUFDckUsa0VBQW9DO0FBQ3BDLCtDQUE0QztBQUM1QyxtREFBa0Q7QUFFbEQscUNBQStCO0FBQy9CLGdFQUF3QztBQUV4QyxNQUFNLElBQUksR0FBRyxJQUFJLG1CQUFTLEVBQUUsQ0FBQztBQUV0QixLQUFLLFVBQVUsVUFBVSxDQUFDLEdBQVksRUFBRSxHQUFhO0lBQzFELElBQUk7UUFHRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQXlCRztRQUNILE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sQ0FBQyxHQUFHLElBQUEsY0FBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQzthQUNuQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDYixPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1gsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXpELE1BQU0sR0FBRyxHQUFHLGlCQUFDLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsaUNBQWEsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxlQUFNLENBQUMsSUFBSSxDQUFDO1lBQ1YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO1lBQ2QsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO1lBQ2hCLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtZQUNsQixFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUU7WUFDVixTQUFTLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7U0FDakMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3ZCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixNQUFNLENBQUMsR0FBRyxHQUFZLENBQUM7UUFDdkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBQSxxQkFBVSxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUNwRDtBQUNILENBQUM7QUFwREQsZ0NBb0RDIn0=