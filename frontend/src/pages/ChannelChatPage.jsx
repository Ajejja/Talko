import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const ChannelChatPage = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);

  const fetchChannel = async () => {
    try {
      const res = await axiosInstance.get("/channels");
      const ch = res.data.find((c) => c._id === id);
      setChannel(ch);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load channel info");
    }
  };

  useEffect(() => {
    fetchChannel();
  }, [id]);

  if (!channel) return <div className="p-4">Loading channel...</div>;

  return <ChatContainer type="channel" channelInfo={channel} />;
};

export default ChannelChatPage;
