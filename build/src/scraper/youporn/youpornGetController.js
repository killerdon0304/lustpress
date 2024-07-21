"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeContent = void 0;
const cheerio_1 = require("cheerio");
const LustPress_1 = __importDefault(require("../../LustPress"));
const lust = new LustPress_1.default();
async function scrapeContent(url) {
    try {
        const resolve = await lust.fetchBody(url);
        const $ = (0, cheerio_1.load)(resolve);
        class YouPorn {
            link;
            id;
            title;
            image;
            duration;
            views;
            rating;
            publish;
            upVote;
            downVote;
            video;
            tags;
            models;
            constructor() {
                this.link = $("link[rel='canonical']").attr("href") || "None";
                this.id = this.link.replace("https://www.youporn.com/watch/", "") || "None";
                this.title = $("meta[property='og:title']").attr("content") || "None";
                this.image = $("meta[property='og:image']").attr("content") || "None";
                this.duration = $("meta[property='video:duration']").attr("content") || "0";
                this.views = $("div.feature.infoValueBlock").find("div[data-value]").attr("data-value") || "0";
                this.rating = $("div.feature").find("span").text().replace(/[^0-9.,%]/g, "") || "0";
                this.publish = $("div.video-uploaded").find("span").text() || "None";
                this.upVote = this.views;
                this.downVote = "None";
                this.video = `https://www.youporn.com/embed/${this.id}`;
                this.tags = $("a[data-espnode='category_tag'], a[data-espnode='porntag_tag']")
                    .map((i, el) => {
                    return $(el).text();
                }).get();
                this.models = $("a[data-espnode='pornstar_tag']")
                    .map((i, el) => {
                    return $(el).text();
                }).get();
            }
        }
        const yp = new YouPorn();
        const data = {
            success: true,
            data: {
                title: lust.removeHtmlTagWithoutSpace(yp.title),
                id: yp.id,
                image: yp.image,
                duration: lust.secondToMinute(Number(yp.duration)),
                views: yp.views,
                rating: yp.rating,
                uploaded: yp.publish,
                upvoted: yp.upVote,
                downvoted: yp.downVote,
                models: yp.models,
                tags: yp.tags
            },
            source: yp.link,
            assets: [yp.video, yp.image]
        };
        return data;
    }
    catch (err) {
        const e = err;
        throw Error(e.message);
    }
}
exports.scrapeContent = scrapeContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieW91cG9ybkdldENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2NyYXBlci95b3Vwb3JuL3lvdXBvcm5HZXRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFDQUErQjtBQUMvQixnRUFBd0M7QUFHeEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUM7QUFFdEIsS0FBSyxVQUFVLGFBQWEsQ0FBQyxHQUFXO0lBQzdDLElBQUk7UUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLEdBQUcsSUFBQSxjQUFJLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFFeEIsTUFBTSxPQUFPO1lBQ1gsSUFBSSxDQUFTO1lBQ2IsRUFBRSxDQUFTO1lBQ1gsS0FBSyxDQUFTO1lBQ2QsS0FBSyxDQUFTO1lBQ2QsUUFBUSxDQUFTO1lBQ2pCLEtBQUssQ0FBUztZQUNkLE1BQU0sQ0FBUztZQUNmLE9BQU8sQ0FBUztZQUNoQixNQUFNLENBQVM7WUFDZixRQUFRLENBQVM7WUFDakIsS0FBSyxDQUFTO1lBQ2QsSUFBSSxDQUFXO1lBQ2YsTUFBTSxDQUFXO1lBQ2pCO2dCQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQztnQkFDOUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsRUFBRSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUM7Z0JBQzVFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLE1BQU0sQ0FBQztnQkFDdEUsSUFBSSxDQUFDLEtBQUssR0FBRyxD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