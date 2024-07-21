"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchXhamster = void 0;
const xhamsterSearchController_1 = require("../../scraper/xhamster/xhamsterSearchController");
const options_1 = __importDefault(require("../../utils/options"));
const logger_1 = require("../../utils/logger");
const modifier_1 = require("../../utils/modifier");
async function searchXhamster(req, res) {
    try {
        /**
         * @api {get} /xhamster/search Search xhamster videos
         * @apiName Search xhamster
         * @apiGroup xhamster
         * @apiDescription Search xhamster videos
         * @apiParam {String} key Keyword to search
         * @apiParam {Number} [page=1] Page number
         *
         * @apiSuccessExample {json} Success-Response:
         *    HTTP/1.1 200 OK
         *    HTTP/1.1 400 Bad Request
         *
         * @apiExample {curl} curl
         * curl -i https://lust.scathach.id/xhamster/search?key=milf
         * curl -i https://lust.scathach.id/xhamster/search?key=milf&page=2
         *
         * @apiExample {js} JS/TS
         * import axios from "axios"
         *
         * axios.get("https://lust.scathach.id/xhamster/search?key=milf")
         * .then(res => console.log(res.data))
         * .catch(err => console.error(err))
         *
         * @apiExample {python} Python
         * import aiohttp
         * async with aiohttp.ClientSession() as session:
         *  async with session.get("https://lust.scathach.id/xhamster/search?key=milf") as resp:
         *    print(await resp.json())
         */
        const key = req.query.key;
        const page = req.query.page || 1;
        if (!key)
            throw Error("Parameter key is required");
        if (isNaN(Number(page)))
            throw Error("Parameter page must be a number");
        const url = `${options_1.default.XHAMSTER}/search/${(0, modifier_1.spacer)(key)}?page=${page}`;
        const data = await (0, xhamsterSearchController_1.scrapeContent)(url);
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
exports.searchXhamster = searchXhamster;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhhbXN0ZXJTZWFyY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlci94aGFtc3Rlci94aGFtc3RlclNlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4RkFBZ0Y7QUFDaEYsa0VBQW9DO0FBQ3BDLCtDQUE0QztBQUM1QyxtREFBMEQ7QUFHbkQsS0FBSyxVQUFVLGNBQWMsQ0FBQyxHQUFZLEVBQUUsR0FBYTtJQUM5RCxJQUFJO1FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0E0Qkc7UUFFSCxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQWEsQ0FBQztRQUNwQyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUc7WUFBRSxNQUFNLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQ25ELElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFFLE1BQU0sS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFFeEUsTUFBTSxHQUFHLEdBQUcsR0FBRyxpQkFBQyxDQUFDLFFBQVEsV0FBVyxJQUFBLGlCQUFNLEVBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDL0QsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLHdDQUFhLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsZUFBTSxDQUFDLElBQUksQ0FBQztZQUNWLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtZQUNkLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztZQUNoQixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07WUFDbEIsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ1YsU0FBUyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO1NBQ2pDLENBQUMsQ0FBQztRQUNILE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2QjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osTUFBTSxDQUFDLEdBQUcsR0FBWSxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUEscUJBQVUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDcEQ7QUFDSCxDQUFDO0FBbkRELHdDQW1EQyJ9