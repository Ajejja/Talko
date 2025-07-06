import express from "express";
import {
  createChannel,
  getMyChannels,
  getChannelMessages,
  sendChannelMessage
} from "../controllers/channel.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import fileUpload from "express-fileupload";

const router = express.Router();

router.use(protectRoute);

// 🛠️ Handle sending a message with file upload
router.post(
  "/:id/messages",
  fileUpload({ useTempFiles: true }),
  sendChannelMessage
);

// ✅ Get messages in a channel
router.get("/:id/messages", getChannelMessages);

// ✅ Create a new channel
router.post("/", createChannel);

// ✅ Get my channels
router.get("/", getMyChannels);

export default router;
