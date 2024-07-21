"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relatedRedtube = void 0;
const redtubeSearchController_1 = require("../../scraper/redtube/redtubeSearchController");
const options_1 = __importDefault(require("../../utils/options"));
const logger_1 = require("../../utils/logger");
const modifier_1 = require("../../utils/modifier");
async function relatedRedtube(req, res) {
    try {
        /**
         * @api {get} /redtube/get?id=:id Get redtube related videos
         * @apiName Get redtube related videos
         * @apiGroup redtube
         * @apiDescription Get a related redtube videos based on id
         *
         * @apiSuccessExample {json} Success-Response:
         *   HTTP/1.1 200 OK
         *   HTTP/1.1 400 Bad Request
         *
         * @apiExample {curl} curl
         * curl -i https://lust.scathach.id/redtube/get?id=41698751
         *
         * @apiExample {js} JS/TS
         * import axios from "axios"
         *
         * axios.get("https://lust.scathach.id/redtube/get?id=41698751")
         * .then(res => console.log(res.data))
         * .catch(err => console.error(err))
         *
         * @apiExample {python} Python
         * import aiohttp
         * async with aiohttp.ClientSession() as session:
         *  async with session.get("https://lust.scathach.id/redtube/get?id=41698751") as resp:
         *    print(await resp.json())
         */
        const id = req.query.id;
        if (!id)
            throw Error("Parameter key is required");
        if (isNaN(Number(id)))
            throw Error("Parameter id must be a number");
        const url = `${options_1.default.REDTUBE}/${id}`;
        const data = await (0, redtubeSearchController_1.scrapeContent)(url);
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
exports.relatedRedtube = relatedRedtube;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdHViZUdldFJlbGF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29udHJvbGxlci9yZWR0dWJlL3JlZHR1YmVHZXRSZWxhdGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJGQUE4RTtBQUM5RSxrRUFBb0M7QUFDcEMsK0NBQTRDO0FBQzVDLG1EQUFrRDtBQUczQyxLQUFLLFVBQVUsY0FBYyxDQUFDLEdBQVksRUFBRSxHQUFhO0lBQzlELElBQUk7UUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQXlCRztRQUVILE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBWSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxFQUFFO1lBQUUsTUFBTSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUNsRCxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFBRSxNQUFNLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBRXBFLE1BQU0sR0FBRyxHQUFHLEdBQUcsaUJBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFFLENBQUM7UUFDakMsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLHVDQUFhLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsZUFBTSxDQUFDLElBQUksQ0FBQztZQUNWLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtZQUNkLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztZQUNoQixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07WUFDbEIsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ1YsU0FBUyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO1NBQ2pDLENBQUMsQ0FBQztRQUNILE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2QjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osTUFBTSxDQUFDLEdBQUcsR0FBWSxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUEscUJBQVUsRUFBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDcEQ7QUFDSCxDQUFDO0FBL0NELHdDQStDQyJ9