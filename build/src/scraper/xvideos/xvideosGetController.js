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
        class Xvideos {
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
            thumbnail;
            bigimg;
            embed;
            constructor() {
                this.link = $("meta[property='og:url']").attr("content") || "None";
                this.id = this.link.split("/")[3] + "/" + this.link.split("/")[4] || "None";
                this.title = $("meta[property='og:title']").attr("content") || "None";
                this.image = $("meta[property='og:image']").attr("content") || "None";
                this.duration = $("meta[property='og:duration']").attr("content") || "0";
                this.views = $("div#v-views").find("strong.mobile-hide").text() || "None";
                this.rating = $("span.rating-total-txt").text() || "None";
                this.publish = $("script[type='application/ld+json']").text() || "None";
                this.publish = this.publish
                    .split("uploadDate")[1]
                    .split("}")[0]
                    .split(":")[1]
                    .replace(/"/g, "")
                    .replace(/,/g, "") || "None";
                this.upVote = $("span.rating-good-nbr").text() || "None";
                this.downVote = $("span.rating-bad-nbr").text() || "None";
                const thumb = $("script")
                    .map((i, el) => {
                    return $(el).text();
                }).get()
                    .filter((el) => el.includes("html5player.setThumbSlideBig"))[0] || "None";
                this.thumbnail = thumb.match(/html5player.setThumbSlideBig\((.*?)\)/)?.[1] || "None";
                this.bigimg = thumb.match(/html5player.setThumbUrl169\((.*?)\)/)?.[1] || "None";
                this.video = thumb.match(/html5player.setVideoUrlHigh\((.*?)\)/)?.[1] || "None";
                this.tags = $("a.is-keyword.btn.btn-default")
                    .map((i, el) => {
                    return $(el).text();
                }).get();
                this.models = $("li.model")
                    .map((i, el) => {
                    return $(el).find("a").attr("href") || "None";
                }).get();
                this.models = this.models.map((el) => el.split("/")[2]);
                this.embed = $("input#copy-video-embed").attr("value") || "None";
                this.embed = this.embed.split("iframe")[1].split(" ")[1].replace(/src=/g, "").replace(/"/g, "") || "None";
            }
        }
        const xv = new Xvideos();
        const data = {
            success: true,
            data: {
                title: lust.removeHtmlTagWithoutSpace(xv.title),
                id: xv.id,
                image: xv.image,
                duration: lust.secondToMinute(Number(xv.duration)),
                views: lust.removeHtmlTag(xv.views),
                rating: xv.rating,
                uploaded: xv.publish,
                upvoted: xv.upVote,
                downvoted: xv.downVote,
                models: xv.models,
                tags: xv.tags,
            },
            source: xv.link,
            assets: lust.removeAllSingleQuoteOnArray([xv.embed, xv.thumbnail, xv.bigimg, xv.video])
        };
        return data;
    }
    catch (err) {
        const e = err;
        throw Error(e.message);
    }
}
exports.scrapeContent = scrapeContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHZpZGVvc0dldENvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2NyYXBlci94dmlkZW9zL3h2aWRlb3NHZXRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFDQUErQjtBQUMvQixnRUFBd0M7QUFHeEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUM7QUFFdEIsS0FBSyxVQUFVLGFBQWEsQ0FBQyxHQUFXO0lBQzdDLElBQUk7UUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLEdBQUcsSUFBQSxjQUFJLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFFeEIsTUFBTSxPQUFPO1lBQ1gsSUFBSSxDQUFTO1lBQ2IsRUFBRSxDQUFTO1lBQ1gsS0FBSyxDQUFTO1lBQ2QsS0FBSyxDQUFTO1lBQ2QsUUFBUSxDQUFTO1lBQ2pCLEtBQUssQ0FBUztZQUNkLE1BQU0sQ0FBUztZQUNmLE9BQU8sQ0FBUztZQUNoQixNQUFNLENBQVM7WUFDZixRQUFRLENBQVM7WUFDakIsS0FBSyxDQUFTO1lBQ2QsSUFBSSxDQUFXO1lBQ2YsTUFBTSxDQUFXO1lBQ2pCLFNBQVMsQ0FBUztZQUNsQixNQUFNLENBQVM7WUFDZixLQUFLLENBQVM7WUFDZDtnQkFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxNQUFNLENBQUM7Z0JBQ25FLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FB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