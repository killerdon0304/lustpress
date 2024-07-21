"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchXnxx = void 0;
const xnxxSearchController_1 = require("../../scraper/xnxx/xnxxSearchController");
const options_1 = __importDefault(require("../../utils/options"));
const logger_1 = require("../../utils/logger");
const modifier_1 = require("../../utils/modifier");
async function searchXnxx(req, res) {
    try {
        /**
         * @api {get} /xnxx/search Search xnxx videos
         * @apiName Search xnxx
         * @apiGroup xnxx
         * @apiDescription Search xnxx videos
         * @apiParam {String} key Keyword to search
         * @apiParam {Number} [page=0] Page number
         *
         * @apiSuccessExample {json} Success-Response:
         *    HTTP/1.1 200 OK
         *    HTTP/1.1 400 Bad Request
         *
         * @apiExample {curl} curl
         * curl -i https://lust.scathach.id/xnxx/search?key=milf
         * curl -i https://lust.scathach.id/xnxx/search?key=milf&page=2
         *
         * @apiExample {js} JS/TS
         * import axios from "axios"
         *
         * axios.get("https://lust.scathach.id/xnxx/search?key=milf")
         * .then(res => console.log(res.data))
         * .catch(err => console.error(err))
         *
         * @apiExample {python} Python
         * import aiohttp
         * async with aiohttp.ClientSession() as session:
         *  async with session.get("https://lust.scathach.id/xnxx/search?key=milf") as resp:
         *    print(await resp.json())
         */
        const key = req.query.key;
        const page = req.query.page || 0;
        if (!key)
            throw Error("Parameter key is required");
        if (isNaN(Number(page)))
            throw Error("Parameter page must be a number");
        const url = `${options_1.default.XNXX}/search/${(0, modifier_1.spacer)(key)}/${page}`;
        const data = await (0, xnxxSearchController_1.scrapeContent)(url);
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
exports.searchXnxx = searchXnxx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG54eFNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250cm9sbGVyL3hueHgveG54eFNlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrRkFBd0U7QUFDeEUsa0VBQW9DO0FBQ3BDLCtDQUE0QztBQUM1QyxtREFBMEQ7QUFHbkQsS0FBSyxVQUFVLFVBQVUsQ0FBQyxHQUFZLEVBQUUsR0FBYTtJQUMxRCxJQUFJO1FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0E0Qkc7UUFFSCxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQWEsQ0FBQztRQUNwQyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUc7WUFBRSxNQUFNLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQ25ELElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFFLE1BQU0sS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFFeEUsTUFBTSxHQUFHLEdBQUcsR0FBRyxpQkFBQyxDQUFDLElBQUksV0FBVyxJQUFBLGlCQUFNLEVBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLG9DQUFhLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsZUFBTSxDQUFDLElBQUksQ0FBQztZQUNWLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtZQUNkLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztZQUNoQixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07WUFDbEIsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ1YsU0FBUyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO1NBQ2pDLENBQUMsQ0FBQztRQUNILE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2QjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osTUFBTSxDQUFDLEdBQUcsR0FBWSxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUEscUJBQVUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDcEQ7QUFDSCxDQUFDO0FBbkRELGdDQW1EQyJ9