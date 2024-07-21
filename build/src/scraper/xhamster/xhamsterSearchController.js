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
        class XhamsterSearch {
            search;
            constructor() {
                const views = $("div.video-thumb-views")
                    .map((i, el) => {
                    const views = $(el).text();
                    return views;
                }).get();
                const duration = $("span[data-role='video-duration']")
                    .map((i, el) => {
                    const duration = $(el).text();
                    return duration;
                }).get();
                this.search = $("a.video-thumb__image-container")
                    .map((i, el) => {
                    const link = $(el).attr("href");
                    return {
                        link: `${link}`,
                        id: link?.split("/")[3] + "/" + link?.split("/")[4],
                        title: $(el).find("img").attr("alt"),
                        image: $(el).find("img").attr("src"),
                        duration: duration[i],
                        views: views[i],
                        video: `${options_1.default.XHAMSTER}/embed/${link?.split("-").pop()}`
                    };
                }).get();
            }
        }
        const xh = new XhamsterSearch();
        if (xh.search.length === 0)
            throw Error("No result found");
        const data = xh.search;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhhbXN0ZXJTZWFyY2hDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NjcmFwZXIveGhhbXN0ZXIveGhhbXN0ZXJTZWFyY2hDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFDQUErQjtBQUMvQixnRUFBd0M7QUFDeEMsa0VBQW9DO0FBR3BDLE1BQU0sSUFBSSxHQUFHLElBQUksbUJBQVMsRUFBRSxDQUFDO0FBRXRCLEtBQUssVUFBVSxhQUFhLENBQUMsR0FBVztJQUM3QyxJQUFJO1FBQ0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxHQUFHLElBQUEsY0FBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXBCLE1BQU0sY0FBYztZQUNsQixNQUFNLENBQU07WUFDWjtnQkFDRSxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsdUJBQXVCLENBQUM7cUJBQ3JDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtvQkFDYixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQzNCLE9BQU8sS0FBSyxDQUFDO2dCQUNmLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNYLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxrQ0FBa0MsQ0FBQztxQkFDbkQsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO29CQUNiLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDOUIsT0FBTyxRQUFRLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLGdDQUFnQyxDQUFDO3FCQUM5QyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7b0JBQ2IsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFFaEMsT0FBTzt3QkFDTCxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUU7d0JBQ2YsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuRCxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUNwQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO3dCQUNwQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQzt3QkFDckIsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ2YsS0FBSyxFQUFFLEdBQUcsaUJBQUMsQ0FBQyxRQUFRLFVBQVUsSUFBSSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtxQkFDdkQsQ0FBQztnQkFDSixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNiLENBQUM7U0FDRjtRQUVELE1BQU0sRUFBRSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDaEMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsTUFBTSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUMzRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsTUFBNkIsQ0FBQztRQUM5QyxNQUFNLE1BQU0sR0FBcUI7WUFDL0IsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsSUFBSTtZQUNWLE1BQU0sRUFBRSxHQUFHO1NBQ1osQ0FBQztRQUNGLE9BQU8sTUFBTSxDQUFDO0tBRWY7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE1BQU0sQ0FBQyxHQUFHLEdBQVksQ0FBQztRQUN2QixNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDeEI7QUFDSCxDQUFDO0FBakRELHNDQWlEQyJ9