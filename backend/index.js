import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import Videos from "./videoModel.js";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/videos", express.static("videos"));

const mongoUrl = "mongodb://127.0.0.1:27017/videos";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Error establishing a database connection");
  });

app.get("/videos", async (req, res) => {
  try {
    Videos.find().then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/videos", upload.single("video"), async (req, res) => {
  const videoName = req.file.filename;

  try {
    await Videos.create({ video: videoName });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/");
});
