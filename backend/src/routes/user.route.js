import express from "express";
import User from "../models/user.model.js";
import { protectRoute } from "../middleware/auth.middleware.js"; // ✅ 認証ミドルウェアを適用

const router = express.Router();

// 👥 ユーザー一覧を取得（自分を除く）
// このルートはログイン済みユーザーしかアクセスできない
router.get("/", protectRoute, async (req, res) => {
  try {
    // 自分以外のユーザーを取得し、パスワード情報は除外
    const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");

    res.status(200).json(users); // ユーザー一覧を返す
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" }); // エラー時のレスポンス
  }
});

export default router;
