import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js"; // 🔐 認証ミドルウェア
import {
  getMessages,
  getUsersForSidebar,
  sendMessage
} from "../controllers/message.controller.js"; // 💬 メッセージ関連のコントローラー

const router = express.Router();

// 📋 サイドバー用のユーザー一覧を取得（自分以外）
// 認証が必要
router.get("/users", protectRoute, getUsersForSidebar);

// 💬 特定ユーザーとの過去のメッセージを取得
// :id はチャット相手のユーザーID
router.get("/:id", protectRoute, getMessages);

// 📤 メッセージ送信（テキスト、画像、ファイル）
// :id は送信先ユーザーのID
router.post("/send/:id", protectRoute, sendMessage);

// ルーターをエクスポートしてアプリ側で使用可能にする
export default router;
