// src/store/useChannelStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChannelStore = create((set, get) => ({
  channels: [],
  selectedChannel: null,

  fetchChannels: async () => {
    try {
      const res = await axiosInstance.get("/channels");
      set({ channels: res.data });
    } catch (err) {
      toast.error("Failed to load channels");
      console.error("fetchChannels error:", err);
    }
  },

  createChannel: async (name, members) => {
    try {
      const res = await axiosInstance.post("/channels", { name, members });
      const newChannel = res.data;
      set((state) => ({ channels: [...state.channels, newChannel] }));
      toast.success("Channel created!");
      return newChannel;
    } catch (err) {
      toast.error("Failed to create channel");
      console.error("createChannel error:", err);
      throw err;
    }
  },

  setSelectedChannel: (channel) => set({ selectedChannel: channel }),
}));
