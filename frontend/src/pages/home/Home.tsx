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

        <div className="flex flex-grow gap-4 flex-col md:flex-row">
          <div className="flex-grow md:w-[49%]">
            <CarouselCard />
          </div>
          <div className="flex-grow md:w-[49%]">
            <SummaryCard />
          </div>
        </div>

        <MonthlyCard />
      </div>
    </PageLayout>
  );
};
