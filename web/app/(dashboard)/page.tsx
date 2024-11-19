import { PumpGridHead } from "@/components/features/pumps/head";
import { PumpCardList } from "@/components/features/pumps/pump-card-list";
import { getInitialData } from "@/utils/data/get-initial-data";

const Home = async () => {
  const initialData = await getInitialData();

  return (
    <main className="container mx-auto px-6 sm:px-14 flex items-center w-full h-full py-4 sm:py-8">
      <div className="w-full h-full flex flex-col">
        <PumpGridHead />
        <PumpCardList initialData={initialData} />
      </div>
    </main>
  );
};

export default Home;
