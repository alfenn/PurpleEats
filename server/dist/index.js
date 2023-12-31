"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const scrape_1 = __importDefault(require("./src/utils/scrape"));
const server_1 = __importDefault(require("./server"));
dotenv_1.default.config();
scrape_1.default.start();
const port = process.env.PORT;
server_1.default.listen((port), () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//send the metadata for a dining hall
// app.get('/metaData/:diningHallName', async (req,res) => {
//   try{
//     const diningHall = req.params.diningHallName;
//     //topItem, avgRating = await find_top_item(diningHall);
//     const topItem= await findTopRating("reviews",diningHall);
//     const avgRating= await findAverageRating("reviews",diningHall);
//     const imageLink = "image link";
//     res.json({"diningHall":diningHall,
//               "topItem": topItem,
//               "avgRating":avgRating,
//               "imageLink":imageLink
//   });
//   }
//   catch(err:any){
//     res.status(500).json({"error": err.message});
//   }})
//implement databases for daily items
