import OpenProposalList from "@/components/sections/Proposals";
import FooterSection from "@/components/sections/Footer";
import { HeroPage } from "@/components/sections/HeroPage";
import MetricsOverview from "@/components/sections/MetricsOverview";
import OverviewSection from "@/components/sections/OverviewSection";
import { PartnersOverview } from "@/components/sections/PartnersOverview";

export default function Home() {
  return (
    <main>
      <HeroPage />
      <MetricsOverview />
      <OpenProposalList />
      <OverviewSection />
      <PartnersOverview />
      <FooterSection />
    </main>
  );
}
