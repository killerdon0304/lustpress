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
        class XvideosSearch {
            search;
            constructor() {
                const data = $("div.thumb-under")
                    .map((i, el) => {
                    return {
                        title: $(el).find("a").attr("title"),
                        duration: $(el).find("span.duration")
                            .map((i, el) => {
                            return $(el).text();
                        }).get()[0],
                    };
                }).get();
                this.search = $("div.mozaique.cust-nb-cols")
                    .find("div.thumb")
                    .map((i, el) => {
                    return {
                        link: `${options_1.default.XVIDEOS}${$(el).find("a").attr("href")}` || "None",
                        id: $(el).find("a").attr("href") || "None",
                        image: $(el).find("img").attr("data-src") || "None",
                        title: data[i].title || "None",
                        duration: data[i].duration === data[i + 1]?.duration
                            ? ""
                            : data[i].duration || "None",
                        rating: null,
                        video: `${options_1.default.XVIDEOS}/embedframe/${$(el).find("img").attr("data-videoid")}`
                    };
                }).get();
                this.search = this.search.filter((el) => {
                    return !el.id.includes("THUMBNUM");
                });
                this.search = this.search.filter((el) => {
                    return el.id.includes("/video");
                });
            }
        }
        const xv = new XvideosSearch();
        if (xv.search.length === 0)
            throw Error("No result found");
        const data = xv.search;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHZpZGVvc1NlYXJjaENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2NyYXBlci94dmlkZW9zL3h2aWRlb3NTZWFyY2hDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFDQUErQjtBQUMvQixnRUFBd0M7QUFDeEMsa0VBQW9DO0FBR3BDLE1BQU0sSUFBSSxHQUFHLElBQUksbUJBQVMsRUFBRSxDQUFDO0FBRXRCLEtBQUssVUFBVSxhQUFhLENBQUMsR0FBVztJQUM3QyxJQUFJO1FBQ0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxHQUFHLElBQUEsY0FBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXBCLE1BQU0sYUFBYTtZQUNqQixNQUFNLENBQVc7WUFDakI7Z0JBQ0UsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO3FCQUM5QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7b0JBQ2IsT0FBTzt3QkFDTCxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNwQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7NkJBQ2xDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTs0QkFDYixPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDdEIsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNkLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ1gsSUFBSSxDQUFDLE1BQU0s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