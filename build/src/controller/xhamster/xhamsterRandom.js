"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomXhamster = void 0;
const xhamsterGetController_1 = require("../../scraper/xhamster/xhamsterGetController");
const options_1 = __importDefault(require("../../utils/options"));
const logger_1 = require("../../utils/logger");
const modifier_1 = require("../../utils/modifier");
const cheerio_1 = require("cheerio");
const LustPress_1 = __importDefault(require("../../LustPress"));
const lust = new LustPress_1.default();
async function randomXhamster(req, res) {
    try {
        /**
         * @api {get} /xhamster/random Get random xhamster
         * @apiName Get random xhamster
         * @apiGroup xhamster
         * @apiDescription Get a random xhamster video
         *
         * @apiSuccessExample {json} Success-Response:
         *   HTTP/1.1 200 OK
         *   HTTP/1.1 400 Bad Request
         *
         * @apiExample {curl} curl
         * curl -i https://lust.scathach.id/xhamster/random
         *
         * @apiExample {js} JS/TS
         * import axios from "axios"
         *
         * axios.get("https://lust.scathach.id/xhamster/random")
         * .then(res => console.log(res.data))
         * .catch(err => console.error(err))
         *
         * @apiExample {python} Python
         * import aiohttp
         * async with aiohttp.ClientSession() as session:
         *  async with session.get("https://lust.scathach.id/xhamster/random") as resp:
         *    print(await resp.json())
         */
        const resolve = await lust.fetchBody(`${options_1.default.XHAMSTER}/newest`);
        const $ = (0, cheerio_1.load)(resolve);
        const search = $("a.root-9d8b4.video-thumb-info__name.role-pop.with-dropdown")
            .map((i, el) => $(el).attr("href"))
            .get();
        const search_ = search.map((el) => el.replace(options_1.default.XHAMSTER, ""));
        const random = Math.floor(Math.random() * search_.length);
        const url = options_1.default.XHAMSTER + search_[random];
        const data = await (0, xhamsterGetController_1.scrapeContent)(url);
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
exports.randomXhamster = randomXhamster;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhhbXN0ZXJSYW5kb20uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlci94aGFtc3Rlci94aGFtc3RlclJhbmRvbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3RkFBNkU7QUFDN0Usa0VBQW9DO0FBQ3BDLCtDQUE0QztBQUM1QyxtREFBa0Q7QUFFbEQscUNBQStCO0FBQy9CLGdFQUF3QztBQUV4QyxNQUFNLElBQUksR0FBRyxJQUFJLG1CQUFTLEVBQUUsQ0FBQztBQUV0QixLQUFLLFVBQVUsY0FBYyxDQUFDLEdBQVksRUFBRSxHQUFhO0lBQzlELElBQUk7UUFHRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQXlCRztRQUNILE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLGlCQUFDLENBQUMsUUFBUSxTQUFTLENBQUMsQ0FBQztRQUM3RCxNQUFNLENBQUMsR0FBRyxJQUFBLGNBQUksRUFBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsNERBQTRELENBQUM7YUFDM0UsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNsQyxHQUFHLEVBQUUsQ0FBQztRQUVULE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsaUJBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsTUFBTSxHQUFHLEdBQUcsaUJBQUMsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSxxQ0FBYSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLGVBQU0sQ0FBQyxJQUFJLENBQUM7WUFDVixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7WUFDZCxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7WUFDaEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO1lBQ2xCLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNWLFNBQVMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztTQUNqQyxDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE1BQU0sQ0FBQyxHQUFHLEdBQVksQ0FBQztRQUN2QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFBLHFCQUFVLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQ3BEO0FBQ0gsQ0FBQztBQXBERCx3Q0FvREMifQ==