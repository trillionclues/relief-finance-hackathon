import OpenDonationsList from "@/components/sections/Donations";
import { HeroPage } from "@/components/sections/HeroPage";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HeroPage />
      <OpenDonationsList />
    </main>
  );
}
