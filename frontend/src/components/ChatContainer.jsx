import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = ({ type = "private", channelInfo = null }) => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null); // ⏬ 最下部にスクロールするための参照

  // ✅ 初回読み込み時・対象ユーザー/チャンネル変更時にメッセージを取得
  useEffect(() => {
    if (type === "channel") {
      if (channelInfo?._id) {
        getMessages(channelInfo._id, true); // チャンネルメッセージ
      }
    } else {
      if (selectedUser?._id) {
        getMessages(selectedUser._id); // プライベートメッセージ
      }
    }

    subscribeToMessages(); // 🔄 WebSocketでメッセージ購読開始
    return () => unsubscribeFromMessages(); // 📴 コンポーネント離脱時に購読解除
  }, [selectedUser?._id, channelInfo?._id]);

  // 📜 新しいメッセージが届いたら自動で最下部にスクロール
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 🖼️ 画像ファイルかどうかを判定
  const isImageFile = (fileUrl) => /\.(jpg|jpeg|png|gif|webp)$/i.test(fileUrl);

  // 🔤 ファイル名をURLから抽出
  const extractFileName = (url) =>
    decodeURIComponent(url.split("/").pop().split("?")[0]);

  // 👤 送信者の情報を取得（プライベート or チャンネルで分岐）
  const getSenderInfo = (msg) => {
    if (type === "channel") {
      return msg.senderId || {};
    } else {
      return msg.senderId === authUser._id ? authUser : selectedUser;
    }
  };

  // ✅ 自分の送信かどうかを判定（表示位置のため）
  const isSender = (msg) => {
    const senderId =
      typeof msg.senderId === "object" ? msg.senderId._id : msg.senderId;
    return senderId === authUser._id;
  };

  // 🔄 読み込み中はスケルトン表示
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader type={type} channelInfo={channelInfo} />
        <MessageSkeleton />
        <MessageInput type={type} channelId={channelInfo?._id} />
      </div>
    );
  }

  // ✅ メッセージ表示本体
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader type={type} channelInfo={channelInfo} />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const sender = getSenderInfo(message);

          return (
            <div
              key={message._id}
              className={`chat ${isSender(message) ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              {/* 🧑‍🦰 アバター */}
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={sender.profilePic || "/avatar.png"}
                    alt={sender.fullName || "User"}
                  />
                </div>
              </div>

              {/* 👤 ユーザー名と時刻 */}
              <div className="chat-header mb-1">
                <span className="font-medium text-sm">{sender.fullName}</span>
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {/* 💬 メッセージ本体 */}
              <div className="chat-bubble flex flex-col max-w-[85%] break-words">
                {/* 画像メッセージ */}
                {message.image && isImageFile(message.image) && (
                  <img
                    src={message.image}
                    alt="sent image"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}

                {/* その他ファイル（画像以外） */}
                {message.image && !isImageFile(message.image) && (
                  <a
                    href={message.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="text-sm text-blue-500 underline break-all"
                  >
                    📎 {extractFileName(message.image)}
                  </a>
                )}

                {/* 添付ファイル（fileプロパティ） */}
                {message.file && (
                  <a
                    href={message.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="text-sm text-green-500 underline break-all mt-1"
                  >
                    📄 {extractFileName(message.file)}
                  </a>
                )}

                {/* テキストメッセージ */}
                {message.text && <p>{message.text}</p>}

                {/* 中身がない or 不正なメッセージ */}
                {!message.text && !message.image && !message.file && (
                  <p className="italic text-gray-400">Unsupported message</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ✏️ メッセージ入力欄 */}
      <MessageInput type={type} channelId={channelInfo?._id} />
    </div>
  );
};

export default ChatContainer;
