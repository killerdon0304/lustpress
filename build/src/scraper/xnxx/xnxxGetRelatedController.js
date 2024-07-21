"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeContent = void 0;
const cheerio_1 = require("cheerio");
const LustPress_1 = __importDefault(require("../../LustPress"));
const options_1 = __importDefault(require("../../utils/options"));
const lust = new LustPress_1.default();
async function scrapeContent(url) {
    try {
        const res = await lust.fetchBody(url);
        const $ = (0, cheerio_1.load)(res);
        class PornhubSearch {
            search;
            data;
            constructor() {
                // in <div id="video-player-bg"> get <script>var video_related=
                this.search = $("div#video-player-bg")
                    .map((i, el) => {
                    const script = $(el).find("script").html();
                    const video_related = script?.split("var video_related=")[1];
                    //stop and replace everything after the last ];
                    const badJson = video_related?.split("];")[0] + "]";
                    const actualResult = JSON.parse(String(badJson));
                    //console.log(actualResult);
                    const result = actualResult.map((el) => {
                        return {
                            link: `${options_1.default.XNXX}${el.u}`,
                            id: el.u.slice(1, -1),
                            title: el.t,
                            image: el.i,
                            duration: el.d,
                            views: `${el.n}, ${el.r}`,
                            video: `${options_1.default.XNXX}/embedframe/${el.id}`
                        };
                    });
                    return result;
                }).get();
            }
        }
        const x = new PornhubSearch();
        if (x.search.length === 0)
            throw Error("No result found");
        const data = x.search;
        const result = {
            success: true,
            data: data,
            source: url,
        };
        return result;
    }
    catch (err) {
        const e = err;
        throw Error(e.message);
    }
}
exports.scrapeContent = scrapeContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG54eEdldFJlbGF0ZWRDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NjcmFwZXIveG54eC94bnh4R2V0UmVsYXRlZENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEscUNBQStCO0FBQy9CLGdFQUF3QztBQUN4QyxrRUFBb0M7QUFHcEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUM7QUFFdEIsS0FBSyxVQUFVLGFBQWEsQ0FBQyxHQUFXO0lBQzdDLElBQUk7UUFDRixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLEdBQUcsSUFBQSxjQUFJLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFFcEIsTUFBTSxhQUFhO1lBQ2pCLE1BQU0sQ0FBVztZQUNqQixJQUFJLENBQVM7WUFDYjtnQkFDRSwrREFBK0Q7Z0JBQy9ELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLHFCQUFxQixDQUFDO3FCQUNuQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7b0JBQ2IsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDM0MsTUFBTSxhQUFhLEdBQUcsTUFBTSxFQUFFLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3RCwrQ0FBK0M7b0JBQy9DLE1BQU0sT0FBTyxHQUFHLGFBQWEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO29CQUNwRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNqRCw0QkFBNEI7b0JBQzVCLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRTt3QkFDMUMsT0FBTzs0QkFDTCxJQUFJLEVBQUUsR0FBRyxpQkFBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFOzRCQUN4QixFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNyQixLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7NEJBQ1gsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDOzRCQUNYLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQzs0QkFDZCxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUU7NEJBQ3pCLEtBQUssRUFBRSxHQUFHLGlCQUFDLENBQUMsSUFBSSxlQUFlLEVBQUUsQ0FBQyxFQUFFLEVBQUU7eUJBQ3ZDLENBQUM7b0JBQ0osQ0FBQyxDQUFDLENBQUM7b0JBQ0gsT0FBTyxNQUFNLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2IsQ0FBQztTQUNGO1FBRUQsTUFBTSxDQUFDLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxNQUFNLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzFELE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUE2QixDQUFDO1FBQzdDLE1BQU0sTUFBTSxHQUFxQjtZQUMvQixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLEdBQUc7U0FDWixDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUM7S0FFZjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osTUFBTSxDQUFDLEdBQUcsR0FBWSxDQUFDO1FBQ3ZCLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN4QjtBQUNILENBQUM7QUFoREQsc0NBZ0RDIn0=