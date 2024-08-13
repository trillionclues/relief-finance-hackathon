import OpenDonationsList from "@/components/sections/Donations";
import FooterSection from "@/components/sections/Footer";
import { HeroPage } from "@/components/sections/HeroPage";
import MetricsOverview from "@/components/sections/MetricsOverview";
import OverviewSection from "@/components/sections/OverviewSection";
import { PartnersOverview } from "@/components/sections/PartnersOverview";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HeroPage />
      <MetricsOverview />
      <OpenDonationsList />
      <OverviewSection />
      <PartnersOverview />
      <FooterSection />
    </main>
  );
}
