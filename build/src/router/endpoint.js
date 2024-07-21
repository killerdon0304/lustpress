"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const limit_options_1 = require("../utils/limit-options");
// PornHub
const pornhubGet_1 = require("../controller/pornhub/pornhubGet");
const pornhubSearch_1 = require("../controller/pornhub/pornhubSearch");
const pornhubRandom_1 = require("../controller/pornhub/pornhubRandom");
const pornhubGetRelated_1 = require("../controller/pornhub/pornhubGetRelated");
// XNXX
const xnxxGet_1 = require("../controller/xnxx/xnxxGet");
const xnxxSearch_1 = require("../controller/xnxx/xnxxSearch");
const xnxxGetRelated_1 = require("../controller/xnxx/xnxxGetRelated");
const xnxxRandom_1 = require("../controller/xnxx/xnxxRandom");
// RedTube
const redtubeGet_1 = require("../controller/redtube/redtubeGet");
const redtubeSearch_1 = require("../controller/redtube/redtubeSearch");
const redtubeGetRelated_1 = require("../controller/redtube/redtubeGetRelated");
const redtubeRandom_1 = require("../controller/redtube/redtubeRandom");
// Xvideos
const xvideosGet_1 = require("../controller/xvideos/xvideosGet");
const xvideosSearch_1 = require("../controller/xvideos/xvideosSearch");
const xvideosRandom_1 = require("../controller/xvideos/xvideosRandom");
const xvideosGetRelated_1 = require("../controller/xvideos/xvideosGetRelated");
// Xhamster
const xhamsterGet_1 = require("../controller/xhamster/xhamsterGet");
const xhamsterSearch_1 = require("../controller/xhamster/xhamsterSearch");
const xhamsterRandom_1 = require("../controller/xhamster/xhamsterRandom");
const xhamsterGetRelated_1 = require("../controller/xhamster/xhamsterGetRelated");
// YouPorn
const youpornGet_1 = require("../controller/youporn/youpornGet");
const youpornSearch_1 = require("../controller/youporn/youpornSearch");
const youpornGetRelated_1 = require("../controller/youporn/youpornGetRelated");
const youpornRandom_1 = require("../controller/youporn/youpornRandom");
function scrapeRoutes() {
    const router = (0, express_1.Router)();
    router.get("/pornhub/get", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, pornhubGet_1.getPornhub);
    router.get("/pornhub/search", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, pornhubSearch_1.searchPornhub);
    router.get("/pornhub/random", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, pornhubRandom_1.randomPornhub);
    router.get("/pornhub/related", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, pornhubGetRelated_1.relatedPornhub);
    router.get("/xnxx/get", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, xnxxGet_1.getXnxx);
    router.get("/xnxx/search", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, xnxxSearch_1.searchXnxx);
    router.get("/xnxx/related", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, xnxxGetRelated_1.relatedXnxx);
    router.get("/xnxx/random", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, xnxxRandom_1.randomXnxx);
    router.get("/redtube/get", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, redtubeGet_1.getRedtube);
    router.get("/redtube/search", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, redtubeSearch_1.searchRedtube);
    router.get("/redtube/related", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, redtubeGetRelated_1.relatedRedtube);
    router.get("/redtube/random", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, redtubeRandom_1.randomRedtube);
    router.get("/xvideos/get", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, xvideosGet_1.getXvideos);
    router.get("/xvideos/search", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, xvideosSearch_1.searchXvideos);
    router.get("/xvideos/random", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, xvideosRandom_1.randomXvideos);
    router.get("/xvideos/related", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, xvideosGetRelated_1.relatedXvideos);
    router.get("/xhamster/get", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, xhamsterGet_1.getXhamster);
    router.get("/xhamster/search", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, xhamsterSearch_1.searchXhamster);
    router.get("/xhamster/random", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, xhamsterRandom_1.randomXhamster);
    router.get("/xhamster/related", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, xhamsterGetRelated_1.relatedXhamster);
    router.get("/youporn/get", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, youpornGet_1.getYouporn);
    router.get("/youporn/search", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, youpornSearch_1.searchYouporn);
    router.get("/youporn/related", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, youpornGetRelated_1.relatedYouporn);
    router.get("/youporn/random", (0, cors_1.default)(), limit_options_1.slow, limit_options_1.limiter, youpornRandom_1.randomYouporn);
    return router;
}
exports.default = scrapeRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kcG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVyL2VuZHBvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLHFDQUFpQztBQUNqQywwREFBdUQ7QUFFdkQsVUFBVTtBQUNWLGlFQUE4RDtBQUM5RCx1RUFBb0U7QUFDcEUsdUVBQW9FO0FBQ3BFLCtFQUF5RTtBQUV6RSxPQUFPO0FBQ1Asd0RBQXFEO0FBQ3JELDhEQUEyRDtBQUMzRCxzRUFBZ0U7QUFDaEUsOERBQTJEO0FBRTNELFVBQVU7QUFDVixpRUFBOEQ7QUFDOUQsdUVBQW9FO0FBQ3BFLCtFQUF5RTtBQUN6RSx1RUFBb0U7QUFFcEUsVUFBVTtBQUNWLGlFQUE4RDtBQUM5RCx1RUFBb0U7QUFDcEUsdUVBQW9FO0FBQ3BFLCtFQUF5RTtBQUV6RSxXQUFXO0FBQ1gsb0VBQWlFO0FBQ2pFLDBFQUF1RTtBQUN2RSwwRUFBdUU7QUFDdkUsa0ZBQTRFO0FBRTVFLFVBQVU7QUFDVixpRUFBOEQ7QUFDOUQsdUVBQW9FO0FBQ3BFLCtFQUF5RTtBQUN6RSx1RUFBb0U7QUFFcEUsU0FBUyxZQUFZO0lBQ25CLE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0lBRXhCLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUEsY0FBSSxHQUFFLEVBQUUsb0JBQUksRUFBRSx1QkFBTyxFQUFFLHVCQUFVLENBQUMsQ0FBQztJQUM5RCxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLElBQUEsY0FBSSxHQUFFLEVBQUUsb0JBQUksRUFBRSx1QkFBTyxFQUFFLDZCQUFhLENBQUMsQ0FBQztJQUNwRSxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLElBQUEsY0FBSSxHQUFFLEVBQUUsb0JBQUksRUFBRSx1QkFBTyxFQUFFLDZCQUFhLENBQUMsQ0FBQztJQUNwRSxNQUFNLENBQUMsR0FBRyxD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