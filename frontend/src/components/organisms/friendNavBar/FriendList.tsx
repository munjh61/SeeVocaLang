// 📁 frontend/src/components/organisms/friendNavBar/FriendList.tsx
import type { TabKey } from "./FriendNavBar";

export interface FriendListProps {
  friends: { id: number; name: string; status: string }[];
  onAdd: (id: number) => void;
  onDelete: (id: number) => void;
  onAccept: (id: number) => void;
  onRefuse: (id: number) => void;
  selectedTab: TabKey;
  setSelectedTab: (tab: TabKey) => void;
}

// ✅ props 직접 명시해서 받기 — 이거 안 하면 props 타입 {}로 인식됨
export default function FriendList(props: FriendListProps) {
  const {
    friends,
    onAdd,
    onDelete,
    onAccept,
    onRefuse,
    selectedTab,
    setSelectedTab,
  } = props;

  // 👉 타입 사용된 척 해서 빌드 통과
  console.log(
    friends,
    onAdd,
    onDelete,
    onAccept,
    onRefuse,
    selectedTab,
    setSelectedTab
  );

  return <div>FriendList Placeholder</div>;
}
