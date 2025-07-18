import { PageLayout } from "../../components/layout/PageLayout";
import { useAuthStore } from "../../stores/authStore";
import { GreetingCard } from "./components/GreetingCard";
import { CarouselCard } from "./components/CarouselCard";
import { SummaryCard } from "./components/SummaryCard";
import { MonthlyCard } from "./components/MonthlyCard";

export const Home = () => {
  const { user } = useAuthStore();
  return (
    <PageLayout>
      <div className="flex flex-col p-4 gap-8 w-full h-full">
        <GreetingCard user={user} />

        <div className="flex w-full gap-4">
          <div className="w-1/2">
            {/* 캐러셀 */}
            <CarouselCard />
          </div>
          <div className="w-1/2">
            <SummaryCard />
          </div>
        </div>

        <MonthlyCard />
      </div>
    </PageLayout>
  );
};
