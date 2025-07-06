import jwt from "jsonwebtoken";

// 🔐 JWTトークンを生成し、httpOnlyクッキーとしてレスポンスに設定する関数
export const generateToken = (userId, res) => {
  // userIdをペイロードに含めてトークンを生成（有効期限は7日間）
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // 🍪 クライアントにトークンを送信（httpOnlyクッキーとして保存）
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7日間（ミリ秒）
    httpOnly: true, // JavaScriptからアクセス不可（セキュリティ強化）
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // クロスサイト制御
    secure: process.env.NODE_ENV === "production", // 本番環境ではHTTPS必須
  });

  return token; // 必要に応じてトークンを返す（使わない場合もOK）
};
