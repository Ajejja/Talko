const MessageSkeleton = () => {
  // 💬 スケルトンメッセージを6個生成するための配列
  const skeletonMessages = Array(6).fill(null);

  return (
    // 🔽 メッセージリスト部分（縦スクロール対応、パディングあり）
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        // 🔁 chat-start（左）と chat-end（右）を交互に設定して会話風に
        <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
          
          {/* 🧑‍🦰 アバター部分のスケルトン */}
          <div className="chat-image avatar">
            <div className="size-10 rounded-full">
              <div className="skeleton w-full h-full rounded-full" />
            </div>
          </div>

          {/* 🆔 ユーザー名などのスケルトン */}
          <div className="chat-header mb-1">
            <div className="skeleton h-4 w-16" />
          </div>

          {/* 💬 メッセージ本体のスケルトン */}
          <div className="chat-bubble bg-transparent p-0">
            <div className="skeleton h-16 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
