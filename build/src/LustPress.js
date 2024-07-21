"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phin_1 = __importDefault(require("phin"));
const keyv_1 = __importDefault(require("keyv"));
const package_json_1 = __importDefault(require("../package.json"));
const keyv = new keyv_1.default(process.env.REDIS_URL);
keyv.on("error", err => console.log("Connection Error", err));
const ttl = 1000 * 60 * 60 * Number(process.env.EXPIRE_CACHE);
class LustPress {
    url;
    useragent;
    constructor() {
        this.url = "";
        this.useragent = `${package_json_1.default.name}/${package_json_1.default.version} Node.js/16.9.1`;
    }
    /**
       * Fetch body from url and check if it's cached
       * @param url url to fetch
       * @returns Buffer
       */
    async fetchBody(url) {
        const cached = await keyv.get(url);
        if (cached) {
            console.log("Fetching from cache");
            return cached;
        }
        else if (url.includes("/random")) {
            console.log("Random should not be cached");
            const res = await (0, phin_1.default)({
                url: url,
                "headers": {
                    "User-Agent": process.env.USER_AGENT || `${package_json_1.default.name}/${package_json_1.default.version} Node.js/16.9.1`,
                },
                followRedirects: true
            });
            return res.body;
        }
        else {
            console.log("Fetching from source");
            url = url.replace(/\/\//g, "/");
            const res = await (0, phin_1.default)({
                url: url,
                "headers": {
                    "User-Agent": process.env.USER_AGENT || `${package_json_1.default.name}/${package_json_1.default.version} Node.js/16.9.1`,
                },
                followRedirects: true
            });
            await keyv.set(url, res.body, ttl);
            return res.body;
        }
    }
    /**
     * remove html tag and bunch of space
     * @param str string to remove html tag
     * @returns string
     */
    removeHtmlTag(str) {
        str = str.replace(/(\r\n|\n|\r)/gm, "");
        str = str.replace(/\s+/g, "");
        return str;
    }
    /**
     * remove html tag without space
     * @param str string to remove html tag
     * @returns string
     */
    removeHtmlTagWithoutSpace(str) {
        str = str.replace(/(\r\n|\n|\r|\t)/gm, "");
        str = str.replace(/\\/g, "");
        str = str.replace(/\s+/g, " ");
        return str.trim();
    }
    /**
     * remove all single quote on array
     * @param arr array to remove single quote
     * @returns string[]
     */
    removeAllSingleQuoteOnArray(arr) {
        return arr.map((item) => item.replace(/'/g, ""));
    }
    /**
     * time ago converter
     * @param input date to convert
     * @returns string
     */
    timeAgo(input) {
        const date = new Date(input);
        const formatter = new Intl.RelativeTimeFormat("en");
        const ranges = {
            years: 3600 * 24 * 365,
            months: 3600 * 24 * 30,
            weeks: 3600 * 24 * 7,
            days: 3600 * 24,
            hours: 3600,
            minutes: 60,
            seconds: 1
        };
        const secondsElapsed = (date.getTime() - Date.now()) / 1000;
        for (const key in ranges) {
            if (ranges[key] < Math.abs(secondsElapsed)) {
                const delta = secondsElapsed / ranges[key];
                return formatter.format(Math.round(delta), key);
            }
        }
    }
    /**
     * convert seconds to minute
     * @param seconds seconds to convert
     * @returns string
     */
    secondToMinute(seconds) {
        const minutes = Math.floor(seconds / 60);
        const second = seconds % 60;
        return `${minutes}min, ${second}sec`;
    }
    /**
     * get current process memory usage
     * @returns object
     */
    currentProccess() {
        const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
        arr.reverse();
        const rss = process.memoryUsage().rss / 1024 / 1024;
        const heap = process.memoryUsage().heapUsed / 1024 / 1024;
        const heaptotal = process.memoryUsage().heapTotal / 1024 / 1024;
        return {
            rss: `${Math.round(rss * 100) / 100} MB`,
            heap: `${Math.round(heap * 100) / 100}/${Math.round(heaptotal * 100) / 100} MB`
        };
    }
    /**
     * fetch this server location
     * @returns <Promise<string>>
     */
    async getServer() {
        const raw = await (0, phin_1.default)({
            "url": "http://ip-api.com/json",
            "parse": "json"
        });
        const data = raw.body;
        return `${data.country}, ${data.regionName}`;
    }
}
exports.default = LustPress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTHVzdFByZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0x1c3RQcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUFvQztBQUNwQyxnREFBd0I7QUFDeEIsbUVBQWtDO0FBR2xDLE1BQU0sSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFN0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDOUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFHOUQsTUFBTSxTQUFTO0lBQ2IsR0FBRyxDQUFTO0lBQ1osU0FBUyxDQUFTO0lBQ2xCO1FBQ0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsc0JBQUcsQ0FBQyxJQUFJLElBQUksc0JBQUcsQ0FBQyxPQUFPLGlCQUFpQixDQUFDO0lBQy9ELENBQUM7SUFFRDs7OztTQUlLO0lBQ0wsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFXO1FBQ3pCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVuQyxJQUFJLE1BQU0sRUFBRTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuQyxPQUFPLE1BQU0sQ0FBQztTQUNmO2FBQU0sSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUMzQyxNQUFNLEdB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