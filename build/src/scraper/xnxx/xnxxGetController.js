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
        class Xnxx {
            link;
            id;
            title;
            image;
            duration;
            views;
            uploaded;
            action;
            upVote;
            downVote;
            favVote;
            tags;
            models;
            thumbnail;
            bigimg;
            video;
            embed;
            constructor() {
                const thumb = $("script")
                    .map((i, el) => {
                    return $(el).text();
                }).get()
                    .filter((el) => el.includes("html5player.setThumbSlideBig"))[0] || "None";
                this.thumbnail = thumb.match(/html5player.setThumbSlideBig\((.*?)\)/)?.[1] || "None";
                this.bigimg = thumb.match(/html5player.setThumbUrl169\((.*?)\)/)?.[1] || "None";
                this.video = thumb.match(/html5player.setVideoUrlHigh\((.*?)\)/)?.[1] || "None";
                this.link = $("meta[property='og:url']").attr("content") || "None";
                this.id = this.link.split(".com/")[1] || "None";
                this.title = $("meta[property='og:title']").attr("content") || "None";
                this.image = $("meta[property='og:image']").attr("content") || "None";
                this.duration = $("meta[property='og:duration']").attr("content") || "None";
                this.views = $("span.metadata").text() || "None";
                this.views = this.views.split("-")[2] || "None";
                this.uploaded = $("script[type='application/ld+json']").text() || "None";
                this.uploaded = this.uploaded
                    .split("uploadDate")[1]
                    .split("}")[0]
                    .split(":")[1]
                    .replace(/"/g, "")
                    .replace(/,/g, "") || "None";
                this.action = $("span.vote-actions")
                    .find("span.value")
                    .map((i, el) => {
                    return $(el).text();
                }).get();
                this.upVote = this.action[0] || "None";
                this.downVote = this.action[1] || "None";
                this.favVote = $("span.rating-box.value").text() || "None";
                this.models = $("a.is-pornstar")
                    .map((i, el) => {
                    return $(el).text();
                }).get();
                this.tags = $("div.metadata-row.video-tags")
                    .find("a")
                    .map((i, el) => {
                    return $(el).text();
                }).get();
                this.embed = $("input#copy-video-embed").attr("value") || "None";
                this.embed = this.embed.split("iframe")[1].split(" ")[1].replace(/src=/g, "").replace(/"/g, "") || "None";
            }
        }
        const x = new Xnxx();
        const data = {
            success: true,
            data: {
                title: lust.removeHtmlTagWithoutSpace(x.title),
                id: x.id,
                image: x.image,
                duration: lust.secondToMinute(Number(x.duration)),
                views: lust.removeHtmlTag(x.views),
                rating: x.favVote,
                uploaded: x.uploaded.trim(),
                upvoted: x.upVote,
                downvoted: x.downVote,
                models: x.models,
                tags: x.tags.filter((el) => el !== "Edit tags and models")
            },
            source: x.link,
            assets: lust.removeAllSingleQuoteOnArray([x.embed, x.thumbnail, x.bigimg, x.video])
        };
        return data;
    }
    catch (err) {
        const e = err;
        throw Error(e.message);
    }
}
exports.scrapeContent = scrapeContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG54eEdldENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2NyYXBlci94bnh4L3hueHhHZXRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFDQUErQjtBQUMvQixnRUFBd0M7QUFHeEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUM7QUFFdEIsS0FBSyxVQUFVLGFBQWEsQ0FBQyxHQUFXO0lBQzdDLElBQUk7UUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLEdBQUcsSUFBQSxjQUFJLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFFeEIsTUFBTSxJQUFJO1lBQ1IsSUFBSSxDQUFTO1lBQ2IsRUFBRSxDQUFTO1lBQ1gsS0FBSyxDQUFTO1lBQ2QsS0FBSyxDQUFTO1lBQ2QsUUFBUSxDQUFTO1lBQ2pCLEtBQUssQ0FBUztZQUNkLFFBQVEsQ0FBUztZQUNqQixNQUFNLENBQVc7WUFDakIsTUFBTSxDQUFTO1lBQ2YsUUFBUSxDQUFTO1lBQ2pCLE9BQU8sQ0FBUztZQUNoQixJQUFJLENBQVc7WUFDZixNQUFNLENBQVc7WUFDakIsU0FBUyxDQUFTO1lBQ2xCLE1BQU0sQ0FBUztZQUNmLEtBQUssQ0FBUztZQUNkLEtBQUssQ0FBUztZQUNkO2dCQUNFLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUM7cUJBQ3RCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtvQkFDYixPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO3FCQUNQLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyw4QkFBOEIsQ0FBQyxD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