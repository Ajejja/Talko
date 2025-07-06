import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = ({ type = "private", channelInfo = null }) => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // For channel chat
  if (type === "channel" && channelInfo) {
    return (
      <div className="p-2.5 border-b border-base-300">
        <div className="flex items-center gap-3">
          {/* Channel avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={channelInfo.image || "/default-channel.png"} alt={channelInfo.name} />
            </div>
          </div>

          {/* Channel info */}
          <div>
            <h3 className="font-medium">{channelInfo.name}</h3>
            <p className="text-sm text-base-content/70">Group Chat</p>
          </div>
        </div>
      </div>
    );
  }

  // For private chat
  if (!selectedUser) return null;

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* User avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
