import OpenDonationsList from "@/components/sections/Donations";
import { HeroPage } from "@/components/sections/HeroPage";
import MetricsOverview from "@/components/sections/MetricsOverview";
import OverviewSection from "@/components/sections/OverviewSection";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HeroPage />
      <OpenDonationsList />
      <OverviewSection />
      <MetricsOverview />
    </main>
  );
}
