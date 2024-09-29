import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Highlight from "./schemas/HighlighSchema";
import cors from "cors";

// Config ENV Vars
dotenv.config();
const port = process.env.PORT;

// Setup Express
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URL!);
mongoose.connection.on("error", (err) => {
  console.error(err);
});
mongoose.connection.on("connected", () => {
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
app.get("/getAllData", async (req, res) => {
  try {
    const data = await Highlight.find();
    res.json({
      items: data,
    });
  } catch (error) {
    console.error(error);
    res
      .json({
        error: "An error occurred",
      })
      .status(500);
  }
});

/**
 * Updates the data in the database if it exists, otherwise creates a new entry
 */
app.post("/updateData", async (req, res) => {
  try {
    const { items } = req.body;
    await Highlight.bulkWrite(
      items.map((item: any) => ({
        updateOne: {
          filter: { _id: item._id },
          update: { $set: { order: item.order, highlight: item.highlight } },
          upsert: true,
        },
      }))
    );
    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res
      .json({
        error: "An error occurred",
      })
      .status(500);
  }
});

/**
 * Deletes a single entry from the database
 */
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Highlight.deleteOne({ _id: id });
    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    res
      .json({
        error: "An error occurred",
      })
      .status(500);
  }
});
