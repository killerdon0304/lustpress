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
        class Xhamster {
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
                this.id = this.link.split("/")[3] + "/" + this.link.split("/")[4] || "None";
                this.title = $("meta[property='og:title']").attr("content") || "None";
                this.image = $("meta[property='og:image']").attr("content") || "None";
                this.duration = $("script#initials-script").html() || "None";
                //remove window.initials={ and };
                this.duration = this.duration.replace("window.initials=", "");
                this.duration = this.duration.replace(/;/g, "");
                this.duration = JSON.parse(this.duration);
                this.duration = this.duration.videoModel.duration || "None";
                this.views = $("div.header-icons").find("span").first().text() || "None";
                this.rating = $("div.header-icons").find("span").eq(1).text() || "None";
                this.publish = $("div.entity-info-container__date").attr("data-tooltip") || "None";
                this.upVote = $("div.rb-new__info").text().split("/")[0].trim() || "None";
                this.downVote = $("div.rb-new__info").text().split("/")[1].trim() || "None";
                this.video = "https://xheve2.com/embed/" + this.link.split("-").pop() || "None";
                this.tags = $("a.video-tag")
                    .map((i, el) => {
                    return $(el).text();
                }).get();
                this.tags = this.tags.map((el) => lust.removeHtmlTagWithoutSpace(el));
                this.models = $("a.video-tag")
                    .map((i, el) => {
                    return $(el).attr("href");
                }).get();
                this.models = this.models.filter((el) => el.startsWith("https://xheve2.com/pornstars/"));
                this.models = this.models.map((el) => el.replace("https://xheve2.com/pornstars/", ""));
            }
        }
        const xh = new Xhamster();
        const data = {
            success: true,
            data: {
                title: lust.removeHtmlTagWithoutSpace(xh.title),
                id: xh.id,
                image: xh.image,
                duration: lust.secondToMinute(Number(xh.duration)),
                views: xh.views,
                rating: xh.rating,
                uploaded: xh.publish,
                upvoted: xh.upVote,
                downvoted: xh.downVote,
                models: xh.models,
                tags: xh.tags
            },
            source: xh.link,
            assets: [xh.video, xh.image]
        };
        return data;
    }
    catch (err) {
        const e = err;
        throw Error(e.message);
    }
}
exports.scrapeContent = scrapeContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhhbXN0ZXJHZXRDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NjcmFwZXIveGhhbXN0ZXIveGhhbXN0ZXJHZXRDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFDQUErQjtBQUMvQixnRUFBd0M7QUFHeEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUM7QUFFdEIsS0FBSyxVQUFVLGFBQWEsQ0FBQyxHQUFXO0lBQzdDLElBQUk7UUFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLEdBQUcsSUFBQSxjQUFJLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFFeEIsTUFBTSxRQUFRO1lBQ1osSUFBSSxDQUFTO1lBQ2IsRUFBRSxDQUFTO1lBQ1gsS0FBSyxDQUFTO1lBQ2QsS0FBSyxDQUFTO1lBQ2QsUUFBUSxDQUFNO1lBQ2QsS0FBSyxDQUFTO1lBQ2QsTUFBTSxDQUFTO1lBQ2YsT0FBTyxDQUFTO1lBQ2hCLE1BQU0sQ0FBUztZQUNmLFFBQVEsQ0FBUztZQUNqQixLQUFLLENBQVM7WUFDZCxJQUFJLENBQVc7WUFDZixNQUFNLENBQVc7WUFDakI7Z0JBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDO2dCQUM5RCxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUM7Z0JBQzVFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLDJCQUEy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