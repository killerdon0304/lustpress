"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPornhub = void 0;
const pornhubSearchController_1 = require("../../scraper/pornhub/pornhubSearchController");
const options_1 = __importDefault(require("../../utils/options"));
const logger_1 = require("../../utils/logger");
const modifier_1 = require("../../utils/modifier");
const sorting = ["mr", "mv", "tr", "lg"];
async function searchPornhub(req, res) {
    try {
        /**
         * @api {get} /pornhub/search Search pornhub videos
         * @apiName Search pornhub
         * @apiGroup pornhub
         * @apiDescription Search pornhub videos
         * @apiParam {String} key Keyword to search
         * @apiParam {Number} [page=1] Page number
         * @apiParam {String} [sort=mr] Sort by
         *
         * @apiSuccessExample {json} Success-Response:
         *    HTTP/1.1 200 OK
         *    HTTP/1.1 400 Bad Request
         *
         * @apiExample {curl} curl
         * curl -i https://lust.scathach.id/pornhub/search?key=milf
         * curl -i https://lust.scathach.id/pornhub/search?key=milf&page=2&sort=mr
         *
         * @apiExample {js} JS/TS
         * import axios from "axios"
         *
         * axios.get("https://lust.scathach.id/pornhub/search?key=milf")
         * .then(res => console.log(res.data))
         * .catch(err => console.error(err))
         *
         * @apiExample {python} Python
         * import aiohttp
         * async with aiohttp.ClientSession() as session:
         *  async with session.get("https://lust.scathach.id/pornhub/search?key=milf") as resp:
         *    print(await resp.json())
         */
        const key = req.query.key;
        const page = req.query.page || 1;
        const sort = req.query.sort;
        if (!key)
            throw Error("Parameter key is required");
        if (isNaN(Number(page)))
            throw Error("Parameter page must be a number");
        let url;
        if (!sort)
            url = `${options_1.default.PORNHUB}/video/search?search=${(0, modifier_1.spacer)(key)}`;
        else if (!sorting.includes(sort))
            url = `${options_1.default.PORNHUB}/video/search?search=${(0, modifier_1.spacer)(key)}&page=${page}`;
        else
            url = `${options_1.default.PORNHUB}/video/search?search=${(0, modifier_1.spacer)(key)}&o=${sort}&page=${page}`;
        console.log(url);
        const data = await (0, pornhubSearchController_1.scrapeContent)(url);
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
exports.searchPornhub = searchPornhub;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ybmh1YlNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb250cm9sbGVyL3Bvcm5odWIvcG9ybmh1YlNlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyRkFBOEU7QUFDOUUsa0VBQW9DO0FBQ3BDLCtDQUE0QztBQUM1QyxtREFBMEQ7QUFFMUQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUVsQyxLQUFLLFVBQVUsYUFBYSxDQUFDLEdBQVksRUFBRSxHQUFhO0lBQzdELElBQUk7UUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0E2Qkc7UUFFSCxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQWEsQ0FBQztRQUNwQyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFDakMsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFjLENBQUM7UUFDdEMsSUFBSSxDQUFDLEdBQUc7WUFBRSxNQUFNLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQ25ELElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUFFLE1BQU0sS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFFeEUsSUFBSSxHQUFHLENBQUM7UUFDUixJQUFJLENBQUMsSUFBSTtZQUFFLEdBQUcsR0FBRyxHQUFHLGlCQUFDLENBQUMsT0FBTyx3QkFBd0IsSUFBQSxpQkFBTSxFQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7YUFDOUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQUUsR0FBRyxHQUFHLEdBQUcsaUJBQUMsQ0FBQyxPQUFPLHdCQUF3QixJQUFBLGlCQUFNLEVBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7O1lBRWxHLEdBQUcsR0FBRyxHQUFHLGlCQUFDLENBQUMsT0FBTyx3QkFBd0IsSUFBQSxpQkFBTSxFQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUNwRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSx1Q0FBYSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLGVBQU0sQ0FBQyxJQUFJLENBQUM7WUFDVixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7WUFDZCxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7WUFDaEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO1lBQ2xCLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNWLFNBQVMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztTQUNqQyxDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE1BQU0sQ0FBQyxHQUFHLEdBQVksQ0FBQztRQUN2QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFBLHFCQUFVLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQ3BEO0FBQ0gsQ0FBQztBQTFERCxzQ0EwREMifQ==