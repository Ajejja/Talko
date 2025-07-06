import mongoose from "mongoose";

const channelMessageSchema = new mongoose.Schema(
  {
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    file: {
      type: String,
    },
  },
  { timestamps: true }
);

const ChannelMessage = mongoose.model("ChannelMessage", channelMessageSchema);
export default ChannelMessage;
