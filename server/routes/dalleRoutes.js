import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";
import { OpenAI } from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, organization: "org-a09uWMgcfUl1mJxuQqTV31HB", project: "proj_dEgxjaq3hgVolKuWXKPYtJR6" });

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });

    const image = aiResponse.data[0].b64_json;
    return res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error?.message || "Errore durante la generazione dell’immagine",
    });
  }
});

export default router;
