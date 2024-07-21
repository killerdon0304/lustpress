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
        class PornHub {
            link;
            id;
            title;
            image;
            duration;
            views;
            rating;
            videoInfo;
            upVote;
            downVote;
            video;
            tags;
            models;
            constructor() {
                this.link = $("link[rel='canonical']").attr("href") || "None";
                this.id = this.link.split("=")[1] || "None";
                this.title = $("meta[property='og:title']").attr("content") || "None";
                this.image = $("meta[property='og:image']").attr("content") || "None";
                //get <meta property="video:duration" content="
                this.duration = $("meta[property='video:duration']").attr("content") || "0";
                this.views = $("div.views > span.count").text() || "None";
                this.rating = $("div.ratingPercent > span.percent").text() || "None";
                this.videoInfo = $("div.videoInfo").text() || "None";
                this.upVote = $("span.votesUp").attr("data-rating") || "None";
                this.downVote = $("span.votesDown").attr("data-rating") || "None";
                this.video = $("meta[property='og:video:url']").attr("content") || "None";
                this.tags = $("div.video-info-row")
                    .find("a")
                    .map((i, el) => {
                    return $(el).text();
                }).get();
                this.tags.shift();
                this.tags = this.tags.map((el) => lust.removeHtmlTagWithoutSpace(el));
                this.models = $("div.pornstarsWrapper.js-pornstarsWrapper")
                    .find("a")
                    .map((i, el) => {
                    return $(el).attr("data-mxptext");
                }).get();
            }
        }
        const ph = new PornHub();
        const data = {
            success: true,
            data: {
                title: lust.removeHtmlTagWithoutSpace(ph.title),
                id: ph.id,
                image: ph.image,
                duration: lust.secondToMinute(Number(ph.duration)),
                views: ph.views,
                rating: ph.rating,
                uploaded: ph.videoInfo,
                upvoted: ph.upVote,
                downvoted: ph.downVote,
                models: ph.models,
                tags: ph.tags.filter((el) => el !== "Suggest" && el !== " Suggest")
            },
            source: ph.link,
            assets: [ph.video, ph.image]
        };
        return data;
    }
    catch (err) {
        const e = err;
        throw Error(e.message);
    }
}
exports.scrapeContent = scrapeContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ybmh1YkdldENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2NyYXBlci9wb3JuaHViL3Bvcm5odWJHZXRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFDQUErQjtBQUMvQixnRUFBd0M7QUFHeEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUM7QUFFdEIsS0FBSyxVQUFVLGFBQWEsQ0FBQyxHQUFXO0lBQzdDLElBQUk7UUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLEdBQUcsSUFBQSxjQUFJLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFFeEIsTUFBTSxPQUFPO1lBQ1gsSUFBSSxDQUFTO1lBQ2IsRUFBRSxDQUFTO1lBQ1gsS0FBSyxDQUFTO1lBQ2QsS0FBSyxDQUFTO1lBQ2QsUUFBUSxDQUFTO1lBQ2pCLEtBQUssQ0FBUztZQUNkLE1BQU0sQ0FBUztZQUNmLFNBQVMsQ0FBUztZQUNsQixNQUFNLENBQVM7WUFDZixRQUFRLENBQVM7WUFDakIsS0FBSyxDQUFTO1lBQ2QsSUFBSSxDQUFXO1lBQ2YsTUFBTSxDQUFXO1lBQ2pCO2dCQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQztnQkFDOUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLE1BQU0sQ0FBQztnQkFDdEUsSUFBSSxDQUFDLEtBQUssR0FB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