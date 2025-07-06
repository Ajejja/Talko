import Channel from "../models/channel.model.js";
import ChannelMessage from "../models/channelMessage.model.js";
import cloudinary from "../lib/cloudinary.js";

export const createChannel = async (req, res) => {
  try {
    const { name, members } = req.body;

    const existing = await Channel.findOne({ name });
    if (existing) return res.status(400).json({ message: "Channel name already exists" });

    const newChannel = new Channel({ name, members });
    await newChannel.save();

    res.status(201).json(newChannel);
  } catch (error) {
    console.error("createChannel error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyChannels = async (req, res) => {
  try {
    const userId = req.user._id;
    const channels = await Channel.find({ members: userId });
    res.status(200).json(channels);
  } catch (error) {
    console.error("getMyChannels error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getChannelMessages = async (req, res) => {
  try {
    const { id: channelId } = req.params;

    const messages = await ChannelMessage.find({ channelId })
      .sort({ createdAt: 1 }) // oldest to newest
      .populate("senderId", "-password"); // populate user info

    res.status(200).json(messages);
  } catch (error) {
    console.error("getChannelMessages error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendChannelMessage = async (req, res) => {
  try {
    const { id: channelId } = req.params;
    const senderId = req.user._id;
    const { text } = req.body;
    const files = req.files || {};

    let imageUrl = null;
    let fileUrl = null;

    if (files.image) {
      const imageUpload = await cloudinary.uploader.upload(files.image.tempFilePath);
      imageUrl = imageUpload.secure_url;
    }

    if (files.file) {
      const fileUpload = await cloudinary.uploader.upload(files.file.tempFilePath, {
        resource_type: "raw",
      });
      fileUrl = fileUpload.secure_url;
    }

    const newMessage = new ChannelMessage({
      channelId,
      senderId,
      text,
      image: imageUrl,
      file: fileUrl,
    });

    await newMessage.save();

    const populatedMessage = await newMessage.populate("senderId", "-password");
    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("sendChannelMessage error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
