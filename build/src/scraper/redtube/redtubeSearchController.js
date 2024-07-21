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
        class RedTubeSearch {
            views;
            search;
            data;
            constructor() {
                this.views = $("span.video_count")
                    .map((i, el) => {
                    const views = $(el).text();
                    return views;
                }).get();
                this.search = $("a.video_link")
                    .map((i, el) => {
                    const link = $(el).attr("href");
                    const id = link?.split("/")[1];
                    const title = $(el).find("img").attr("alt");
                    const image = $(el).find("img").attr("data-src");
                    const duration = $(el).find("span.duration").text().split(" ").map((el) => {
                        return el.replace(/[^0-9:]/g, "");
                    }).filter((el) => {
                        return el.includes(":");
                    }).join(" ");
                    return {
                        link: `${options_1.default.REDTUBE}${link}`,
                        id: id,
                        title: title,
                        image: image,
                        duration: duration,
                        views: this.views[i],
                        video: `https://embed.redtube.com/?id=${id}`,
                    };
                }).get();
                this.data = this.search.filter((el) => {
                    return el.link.includes("javascript:void(0)") === false && el.image?.startsWith("data:image") === false;
                });
            }
        }
        const red = new RedTubeSearch();
        if (red.search.length === 0)
            throw Error("No result found");
        const data = red.data;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkdHViZVNlYXJjaENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2NyYXBlci9yZWR0dWJlL3JlZHR1YmVTZWFyY2hDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFDQUErQjtBQUMvQixnRUFBd0M7QUFDeEMsa0VBQW9DO0FBR3BDLE1BQU0sSUFBSSxHQUFHLElBQUksbUJBQVMsRUFBRSxDQUFDO0FBRXRCLEtBQUssVUFBVSxhQUFhLENBQUMsR0FBVztJQUM3QyxJQUFJO1FBQ0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxHQUFHLElBQUEsY0FBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXBCLE1BQU0sYUFBYTtZQUNqQixLQUFLLENBQVc7WUFDaEIsTUFBTSxDQUFXO1lBQ2pCLElBQUksQ0FBUztZQUNiO2dCQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDO3FCQUMvQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7b0JBQ2IsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUMzQixPQUFPLEtBQUssQ0FBQztnQkFDZixDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDWCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUM7cUJBQzVCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtvQkFDYixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNoQyxNQUFNLEVBQUUsR0FBRyxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvQixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDNUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2pELE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQVUsRUFBRSxFQUFFO3dCQUNoRixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNwQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFVLEVBQUUsRUFBRTt3QkFDdkIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMxQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBRWIsT0FBTzt3QkFDTCxJQUFJLEVBQUUsR0FBRyxpQkFBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLEVBQUU7d0JBQzNCLEVBQUUsRUFBRSxFQUFFO3dCQUNOLEtBQUssRUFBRSxLQUFLO3dCQUNaLEtBQUssRUFBRSxLQUFLO3dCQUNaLFFBQVEsRUFBRSxRQUFRO3dCQUNsQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLEtBQUssRUFBRSxpQ0FBaUMsRUFBRSxFQUFFO3FCQUU3QyxDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUtYLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRTtvQkFDekMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxLQUFLLENBQUM7Z0JBQzFHLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztTQUVGO1FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUVoQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxNQUFNLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzVELE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFnQixDQUFDO1FBQ2xDLE1BQU0sTUFBTSxHQUFxQjtZQUMvQixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLEdBQUc7U0FDWixDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUM7S0FFZjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osTUFBTSxDQUFDLEdBQUcsR0FBWSxDQUFDO1FBQ3ZCLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN4QjtBQUNILENBQUM7QUFoRUQsc0NBZ0VDIn0=