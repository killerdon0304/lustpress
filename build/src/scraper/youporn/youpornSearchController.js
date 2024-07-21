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
        class YouPornSearch {
            dur;
            search;
            constructor() {
                this.dur = $("div.video-duration").map((i, el) => {
                    return $(el).text();
                }).get();
                this.search = $("a[href^='/watch/']")
                    .map((i, el) => {
                    const link = $(el).attr("href");
                    const id = `${link}`.split("/")[2] + "/" + `${link}`.split("/")[3];
                    const title = $(el).find("div.video-box-title").text();
                    const image = $(el).find("img").attr("data-thumbnail");
                    return {
                        link: `${options_1.default.YOUPORN}${link}`,
                        id: id,
                        title: lust.removeHtmlTagWithoutSpace(title),
                        image: image,
                        duration: this.dur[i],
                        views: "None",
                        video: `https://www.youporn.com/embed/${id}`,
                    };
                }).get();
            }
        }
        const yp = new YouPornSearch();
        if (yp.search.length === 0)
            throw Error("No result found");
        const data = yp.search;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91cG9yblNlYXJjaENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2NyYXBlci95b3Vwb3JuL3lvdXBvcm5TZWFyY2hDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFDQUErQjtBQUMvQixnRUFBd0M7QUFDeEMsa0VBQW9DO0FBR3BDLE1BQU0sSUFBSSxHQUFHLElBQUksbUJBQVMsRUFBRSxDQUFDO0FBRXRCLEtBQUssVUFBVSxhQUFhLENBQUMsR0FBVztJQUM3QyxJQUFJO1FBQ0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxHQUFHLElBQUEsY0FBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXBCLE1BQU0sYUFBYTtZQUNqQixHQUFHLENBQVc7WUFDZCxNQUFNLENBQVc7WUFDakI7Z0JBQ0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7b0JBQy9DLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN0QixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDVCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQztxQkFDbEMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO29CQUNiLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2hDLE1BQU0sRUFBRSxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkUsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUN2RCxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUN2RCxPQUFPO3dCQUNMLElBQUksRUFBRSxHQUFHLGlCQUFDLENBQUMsT0FBTyxHQUFHLElBQUksRUFBRTt3QkFDM0IsRUFBRSxFQUFFLEVBQUU7d0JBQ04sS0FBSyxFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUM7d0JBQzVDLEtBQUssRUFBRSxLQUFLO3dCQUNaLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDckIsS0FBSyxFQUFFLE1BQU07d0JBQ2IsS0FBSyxFQUFFLGlDQUFpQyxFQUFFLEVBQUU7cUJBQzdDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDYixDQUFDO1NBQ0Y7UUFFRCxNQUFNLEVBQUUsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQy9CLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUFFLE1BQU0sS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDM0QsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLE1BQTZCLENBQUM7UUFDOUMsTUFBTSxNQUFNLEdBQXFCO1lBQy9CLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsR0FBRztTQUNaLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQztLQUVmO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixNQUFNLENBQUMsR0FBRyxHQUFZLENBQUM7UUFDdkIsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3hCO0FBQ0gsQ0FBQztBQTdDRCxzQ0E2Q0MifQ==