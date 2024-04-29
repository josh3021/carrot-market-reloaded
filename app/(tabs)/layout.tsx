import TabBar from "@/components/tab-bar";

interface ITabLayoutProps {
  children: React.ReactNode;
}

export default function TabLayout({ children }: ITabLayoutProps) {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );
}
