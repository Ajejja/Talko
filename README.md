# Talkoo - リアルタイムグループ＆プライベートチャットアプリ 💬

Talkoは、1対1のメッセージングとグループチャットの両方をサポートする、MERNスタックで構築されたリアルタイムチャットアプリケーションです。リアルタイム通信にはSocket.ioを使用し、JWTによる認証、ユーザーのオンライン状態表示、ファイル共有機能を備えています。UIはTailwindCSSとDaisy UIで構築され、レスポンシブ対応済みです。

## 🔧 技術スタック

- **フロントエンド**: React.js, TailwindCSS, Daisy UI  
- **バックエンド**: Node.js, Express.js  
- **データベース**: MongoDB (Atlas)  
- **認証**: JWT (JSON Web Token)  
- **リアルタイム通信**: Socket.io  
- **状態管理**: Zustand  
- **ファイルアップロード**: Cloudinary  

## ✨ 主な機能

- 🌐 **リアルタイムチャット (1on1 & グループ)**
- 🧵 **グループチャンネル作成機能**
- 🔐 **JWTによる認証（ログイン／サインアップ）**
- 📁 **画像＆ドキュメントのファイル共有**
- 🟢 **オンライン／オフライン表示**
- 🌓 **ダークモード対応UI**

---

## 🚀 セットアップ手順（続き）

### 2 パッケージをインストール
```bash
npm install
cd client && npm install

```
### 3 .env ファイルをルートディレクトリに作成
```bash
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
```
### 4 アプリを起動
#### バックエンド:
```bash
cd backend
npm run dev
```
#### フロントエンド:
```bash
cd frontend
npm run dev
```
## 📸 スクリーンショット（例）:

### 🔐 ログインページ

ユーザーが認証するシンプルでクリーンなUI。

<img width="1406" height="675" alt="Image" src="https://github.com/user-attachments/assets/fe4274ff-182a-4e3f-bef1-be1edac55ed3" />

### 📝 サインアップ画面
ユーザー情報登録フォーム、バリデーション付き。

<img width="1261" height="724" alt="Image" src="https://github.com/user-attachments/assets/a9d0d4ea-4343-49ca-97e6-a6fafa6ed160" />

<img width="1287" height="697" alt="Image" src="https://github.com/user-attachments/assets/23c5b44b-0edc-48fb-8380-7effe0a389d1" />
