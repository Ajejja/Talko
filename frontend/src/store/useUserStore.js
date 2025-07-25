import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useUserStore = create((set) => ({
  users: [],
  fetchUsers: async () => {
    try {
      const res = await axiosInstance.get("/users");
      set({ users: res.data });
    } catch (err) {
      toast.error("Failed to load users");
    }
  },
}));
