import mongoose from "mongoose";

const HighlightSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  highlight: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Highlight", HighlightSchema);
