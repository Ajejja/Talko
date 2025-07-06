import mongoose from "mongoose";

// 📦 チャンネルのスキーマ定義
const channelSchema = new mongoose.Schema(
  {
    // チャンネル名（必須・一意）
    name: {
      type: String,
      required: true,
      unique: true, // 同じ名前のチャンネルは作れない
    },

    // チャンネルのメンバー一覧（Userモデルの参照）
    members: [
      {
        type: mongoose.Schema.Types.ObjectId, // 各メンバーはユーザーID（ObjectId型）
        ref: "User", // Userモデルと関連付け
      }
    ]
  },
  {
    timestamps: true, // ⏰ createdAt・updatedAt を自動で追加
  }
);

// モデル作成・エクスポート
const Channel = mongoose.model("Channel", channelSchema);
export default Channel;
