"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const HighlighSchema_1 = __importDefault(require("./schemas/HighlighSchema"));
const cors_1 = __importDefault(require("cors"));
// Config ENV Vars
dotenv_1.default.config();
const port = process.env.PORT;
// Setup Express
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default.connect(process.env.DB_URL);
mongoose_1.default.connection.on("error", (err) => {
    console.error(err);
});
mongoose_1.default.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});
// Start Server
app.listen(port, () => {
    console.log(`Server is running!`);
});
//
// API Endpoints
//
/**
 * Fetches all data from the database
 */
app.get("/getAllData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield HighlighSchema_1.default.find();
        res.json({
            items: data,
        });
    }
    catch (error) {
        console.error(error);
        res
            .json({
            error: "An error occurred",
        })
            .status(500);
    }
}));
/**
 * Updates the data in the database if it exists, otherwise creates a new entry
 */
app.post("/updateData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items } = req.body;
        yield HighlighSchema_1.default.bulkWrite(items.map((item) => ({
            updateOne: {
                filter: { _id: item._id },
                update: { $set: { order: item.order, highlight: item.highlight } },
                upsert: true,
            },
        })));
        res.json({
            success: true,
        });
    }
    catch (error) {
        console.error(error);
        res
            .json({
            error: "An error occurred",
        })
            .status(500);
    }
}));
/**
 * Deletes a single entry from the database
 */
app.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield HighlighSchema_1.default.deleteOne({ _id: id });
        res.json({
            success: true,
        });
    }
    catch (error) {
        console.error(error);
        res
            .json({
            error: "An error occurred",
        })
            .status(500);
    }
}));
