// src/pages/ChannelsPage.jsx
import { useEffect, useState } from "react";
import { useChannelStore } from "../store/useChannelStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const ChannelsPage = () => {
  const { channels, fetchChannels, createChannel } = useChannelStore();
  const { authUser } = useAuthStore();
  const [name, setName] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchChannels();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      setAllUsers(res.data);
    } catch (error) {
      toast.error("Failed to load users");
    }
  };

  const handleCreateChannel = async () => {
  if (!name || selectedUsers.length === 0) {
    toast.error("Please enter a channel name and select users");
    return;
  }

  // ✅ Include yourself
  const fullMembers = [...new Set([...selectedUsers, authUser._id])];

  try {
    const newChannel = await createChannel(name, fullMembers);
    setName("");
    setSelectedUsers([]);
    navigate(`/channels/${newChannel._id}`);
  } catch (error) {
    console.error(error);
    toast.error("Failed to create channel");
  }
};


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Channels</h2>

      <div className="mb-4 p-4 border rounded bg-white shadow">
        <input
          type="text"
          placeholder="Channel name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full mb-3"
        />

        <label className="block mb-1 font-semibold">Select users:</label>
        <select
          multiple
          value={selectedUsers}
          onChange={(e) =>
            setSelectedUsers([...e.target.selectedOptions].map((o) => o.value))
          }
          className="select select-bordered w-full h-32"
        >
          {allUsers
            .filter((u) => u._id !== authUser?._id)
            .map((user) => (
              <option key={user._id} value={user._id}>
                {user.username || user.fullName || user.email}
              </option>
            ))}
        </select>

        <button className="btn btn-primary mt-4" onClick={handleCreateChannel}>
          Create Channel
        </button>
      </div>

      <ul className="space-y-2">
        {channels.map((channel) => (
          <li
            key={channel._id}
            className="p-3 border rounded bg-white hover:bg-gray-100 cursor-pointer"
            onClick={() => navigate(`/channels/${channel._id}`)}
          >
            <strong>{channel.name}</strong> ({channel.members.length} members)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsPage;
