import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // 📋 スケルトン表示する「連絡先」項目を8個用意
  const skeletonContacts = Array(8).fill(null);

  return (
    // 📦 サイドバー全体のレイアウト（幅：スマホでは20、PCでは72）
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
    >
      {/* 🧭 ヘッダー部分 */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" /> {/* アイコン */}
          <span className="font-medium hidden lg:block">Contacts</span> {/* PCでのみ表示 */}
        </div>
      </div>

      {/* 👤 スケルトンの連絡先リスト */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* 🟠 アバターのスケルトン（常に表示） */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            {/* 🟢 ユーザー情報のスケルトン（PCサイズのみ表示） */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" /> {/* ユーザー名風 */}
              <div className="skeleton h-3 w-16" />     {/* ステータスやメール風 */}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
