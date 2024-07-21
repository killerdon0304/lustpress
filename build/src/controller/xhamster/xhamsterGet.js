"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXhamster = void 0;
const xhamsterGetController_1 = require("../../scraper/xhamster/xhamsterGetController");
const options_1 = __importDefault(require("../../utils/options"));
const logger_1 = require("../../utils/logger");
const modifier_1 = require("../../utils/modifier");
async function getXhamster(req, res) {
    try {
        const id = req.query.id;
        if (!id)
            throw Error("Parameter id is required");
        /**
         * @api {get} /xhamster/get?id=:id Get xhamster
         * @apiName Get xhamster
         * @apiGroup xhamster
         * @apiDescription Get a xhamster video based on id
         *
         * @apiParam {String} id Video ID
         *
         * @apiSuccessExample {json} Success-Response:
         *   HTTP/1.1 200 OK
         *   HTTP/1.1 400 Bad Request
         *
         * @apiExample {curl} curl
         * curl -i https://lust.scathach.id/xhamster/get?id=videos/horny-makima-tests-new-toy-and-cums-intensely-xhAa5wx
         *
         * @apiExample {js} JS/TS
         * import axios from "axios"
         *
         * axios.get("https://lust.scathach.id/xhamster/get?id=videos/horny-makima-tests-new-toy-and-cums-intensely-xhAa5wx")
         * .then(res => console.log(res.data))
         * .catch(err => console.error(err))
         *
         * @apiExample {python} Python
         * import aiohttp
         * async with aiohttp.ClientSession() as session:
         *  async with session.get("https://lust.scathach.id/xhamster/get?id=videos/horny-makima-tests-new-toy-and-cums-intensely-xhAa5wx") as resp:
         *    print(await resp.json())
         */
        const url = `${options_1.default.XHAMSTER}/${id}`;
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
exports.getXhamster = getXhamster;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhhbXN0ZXJHZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlci94aGFtc3Rlci94aGFtc3RlckdldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3RkFBNkU7QUFDN0Usa0VBQW9DO0FBQ3BDLCtDQUE0QztBQUM1QyxtREFBa0Q7QUFHM0MsS0FBSyxVQUFVLFdBQVcsQ0FBQyxHQUFZLEVBQUUsR0FBYTtJQUMzRCxJQUFJO1FBQ0YsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFZLENBQUM7UUFDbEMsSUFBSSxDQUFDLEVBQUU7WUFBRSxNQUFNLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0EyQkc7UUFFSCxNQUFNLEdBQUcsR0FBRyxHQUFHLGlCQUFDLENBQUMsUUFBUSxJQUFJLEVBQUUsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSxxQ0FBYSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLGVBQU0sQ0FBQyxJQUFJLENBQUM7WUFDVixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7WUFDZCxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7WUFDaEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO1lBQ2xCLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNWLFNBQVMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztTQUNqQyxDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE1BQU0sQ0FBQyxHQUFHLEdBQVksQ0FBQztRQUN2QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFBLHFCQUFVLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQ3BEO0FBQ0gsQ0FBQztBQWhERCxrQ0FnREMifQ==