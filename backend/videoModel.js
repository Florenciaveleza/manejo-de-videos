import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  video: String,
});

export default mongoose.model("Videos", videoSchema);
