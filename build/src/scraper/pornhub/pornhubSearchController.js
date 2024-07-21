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
                this.search = $("div.wrap")
                    .map((i, el) => {
                    const link = $(el).find("a").attr("href");
                    const id = link?.split("=")[1];
                    const title = $(el).find("a").attr("title");
                    const image = $(el).find("img").attr("src");
                    const duration = $(el).find("var.duration").text();
                    const views = $(el).find("div.videoDetailsBlock").find("span.views").text();
                    return {
                        link: `${options_1.default.PORNHUB}${link}`,
                        id: id,
                        title: title,
                        image: image,
                        duration: duration,
                        views: views,
                        video: `${options_1.default.PORNHUB}/embed/${id}`,
                    };
                }).get();
                this.data = this.search.filter((el) => {
                    return el.link.includes("javascript:void(0)") === false && el.image?.startsWith("data:image") === false;
                });
            }
        }
        const ph = new PornhubSearch();
        if (ph.search.length === 0)
            throw Error("No result found");
        const data = ph.data;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ybmh1YlNlYXJjaENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2NyYXBlci9wb3JuaHViL3Bvcm5odWJTZWFyY2hDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFDQUErQjtBQUMvQixnRUFBd0M7QUFDeEMsa0VBQW9DO0FBR3BDLE1BQU0sSUFBSSxHQUFHLElBQUksbUJBQVMsRUFBRSxDQUFDO0FBRXRCLEtBQUssVUFBVSxhQUFhLENBQUMsR0FBVztJQUM3QyxJQUFJO1FBQ0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxHQUFHLElBQUEsY0FBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXBCLE1BQU0sYUFBYTtZQUNqQixNQUFNLENBQVc7WUFDakIsSUFBSSxDQUFTO1lBQ2I7Z0JBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDO3FCQUN4QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7b0JBQ2IsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzFDLE1BQU0sRUFBRSxHQUFHLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQy9CLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM1QyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDNUMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDbkQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDNUUsT0FBTzt3QkFDTCxJQUFJLEVBQUUsR0FBRyxpQkFBQyxDQUFDLE9BQU8sR0FBRyxJQUFJLEVBQUU7d0JBQzNCLEVBQUUsRUFBRSxFQUFFO3dCQUNOLEtBQUssRUFBRSxLQUFLO3dCQUNaLEtBQUssRUFBRSxLQUFLO3dCQUNaLFFBQVEsRUFBRSxRQUFRO3dCQUNsQixLQUFLLEVBQUUsS0FBSzt3QkFDWixLQUFLLEVBQUUsR0FBRyxpQkFBQyxDQUFDLE9BQU8sVUFBVSxFQUFFLEVBQUU7cUJBQ2xDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBRVgsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQU8sRUFBRSxFQUFFO29CQUN6QyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLEtBQUssQ0FBQztnQkFDMUcsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1NBRUY7UUFFRCxNQUFNLEVBQUUsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQy9CLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUFFLE1BQU0sS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDM0QsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQWdCLENBQUM7UUFDakMsTUFBTSxNQUFNLEdBQXFCO1lBQy9CLE9BQU8sRUFBRSxJQUFJO1lBQ2IsSUFBSSxFQUFFLElBQUk7WUFDVixNQUFNLEVBQUUsR0FBRztTQUNaLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQztLQUlmO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixNQUFNLENBQUMsR0FBRyxHQUFZLENBQUM7UUFDdkIsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3hCO0FBQ0gsQ0FBQztBQW5ERCxzQ0FtREMifQ==