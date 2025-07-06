import { useEffect, useState } from "react";
import { useChannelStore } from "../store/useChannelStore";
import { useUserStore } from "../store/useUserStore"; // ✅ ユーザー一覧取得用のストア

const CreateChannelModal = () => {
  const [name, setName] = useState(""); // 📛 チャンネル名
  const [selectedUsers, setSelectedUsers] = useState([]); // 👥 選択されたユーザーIDの配列

  const { users, fetchUsers } = useUserStore(); // ✅ ユーザー一覧の取得
  const { createChannel } = useChannelStore(); // ✅ チャンネル作成関数

  useEffect(() => {
    fetchUsers(); // 🔄 コンポーネント初回マウント時にユーザー一覧を取得
  }, []);

  // 🐞 ユーザーリストのデバッグログ（開発用）
  console.log("🧑 Users fetched from store:", users);

  // ✅ フォーム送信時の処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createChannel({ name, members: selectedUsers }); // チャンネル作成
    setName(""); // フォームリセット
    setSelectedUsers([]);
  };

  // ✅ ユーザーの選択・解除処理
  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3 bg-white rounded shadow">
      <h3 className="text-lg font-bold">Create New Channel</h3>

      {/* 🔤 チャンネル名の入力 */}
      <input
        type="text"
        placeholder="Channel name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="input input-bordered w-full"
      />

      {/* ✅ ユーザー選択リスト */}
      <div>
        <label className="block mb-1">Select Users</label>
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {users.length === 0 ? (
            <p className="text-sm text-gray-400">No users found.</p>
          ) : (
            users.map((user) => (
              <div key={user._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => toggleUser(user._id)}
                />
                <span>{user.fullName || user.username || user.email}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ✅ 作成ボタン */}
      <button type="submit" className="btn btn-primary btn-sm">
        Create
      </button>
    </form>
  );
};

export default CreateChannelModal;
