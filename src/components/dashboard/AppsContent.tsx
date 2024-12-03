import FeaturedApps from "@/components/FeaturedApps";
import RandomAd from "@/components/RandomAd";
import AdCarousel from "@/components/AdCarousel";
import AdSpace from "@/components/AdSpace";

export const AppsContent = () => {
  return (
    <div className="space-y-8">
      <FeaturedApps />
      <AdCarousel />
      <AdSpace />
      <RandomAd />
    </div>
  );
};