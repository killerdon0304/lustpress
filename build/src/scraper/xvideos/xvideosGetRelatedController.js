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
            data;
            constructor() {
                this.search = $("div#video-player-bg")
                    .map((i, el) => {
                    const script = $(el).find("script").html();
                    const video_related = script?.split("var video_related=")[1];
                    const badJson = video_related?.split("];")[0] + "]";
                    const actualResult = JSON.parse(String(badJson));
                    const result = actualResult.map((el) => {
                        return {
                            link: `${options_1.default.XVIDEOS}${el.u}`,
                            id: el.u.slice(1, -1),
                            title: el.t,
                            image: el.i,
                            duration: el.d,
                            views: `${el.n}, ${el.r}`,
                            video: `${options_1.default.XVIDEOS}/embedframe/${el.id}`
                        };
                    });
                    return result;
                }).get();
            }
        }
        const x = new XvideosSearch();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHZpZGVvc0dldFJlbGF0ZWRDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NjcmFwZXIveHZpZGVvcy94dmlkZW9zR2V0UmVsYXRlZENvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEscUNBQStCO0FBQy9CLGdFQUF3QztBQUN4QyxrRUFBb0M7QUFHcEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUM7QUFFdEIsS0FBSyxVQUFVLGFBQWEsQ0FBQyxHQUFXO0lBQzdDLElBQUk7UUFDRixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLEdBQUcsSUFBQSxjQUFJLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFFcEIsTUFBTSxhQUFhO1lBQ2pCLE1BQU0sQ0FBVztZQUNqQixJQUFJLENBQVM7WUFDYjtnQkFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztxQkFDbkMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO29CQUNiLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQzNDLE1BQU0sYUFBYSxHQUFHLE1BQU0sRUFBRSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0QsTUFBTSxPQUFPLEdBQUcsYUFBYSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7b0JBQ3BELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2pELE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRTt3QkFDMUMsT0FBTzs0QkFDTCxJQUFJLEVBQUUsR0FBRyxpQkFBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFOzRCQUMzQixFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNyQixLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7NEJBQ1gsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDOzRCQUNYLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQzs0QkFDZCxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUU7NEJBQ3pCLEtBQUssRUFBRSxHQUFHLGlCQUFDLENBQUMsT0FBTyxlQUFlLEVBQUUsQ0FBQyxFQUFFLEVBQUU7eUJBQzFDLENBQUM7b0JBQ0osQ0FBQyxDQUFDLENBQUM7b0JBQ0gsT0FBTyxNQUFNLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2IsQ0FBQztTQUNGO1FBRUQsTUFBTSxDQUFDLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxNQUFNLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzFELE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUE2QixDQUFDO1FBQzdDLE1BQU0sTUFBTSxHQUFxQjtZQUMvQixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLEdBQUc7U0FDWixDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUM7S0FFZjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osTUFBTSxDQUFDLEdBQUcsR0FBWSxDQUFDO1FBQ3ZCLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN4QjtBQUNILENBQUM7QUE3Q0Qsc0NBNkNDIn0=