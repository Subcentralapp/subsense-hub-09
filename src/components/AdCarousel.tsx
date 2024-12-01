import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const partnerAds = [
  {
    title: "Spotify Premium",
    subtitle: "La musique en illimité",
    description: "3 mois gratuits pour tout nouvel abonnement",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=1200&q=80",
    link: "https://spotify.com",
  },
  {
    title: "Microsoft 365",
    subtitle: "La suite bureautique complète",
    description: "-50% sur votre abonnement annuel",
    image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=1200&q=80",
    link: "https://microsoft.com",
  },
  {
    title: "Adobe Creative Cloud",
    subtitle: "Libérez votre créativité",
    description: "Essai gratuit de 30 jours + 20% de réduction",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
    link: "https://adobe.com",
  },
];

const AdCarousel = () => {
  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {partnerAds.map((ad, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[300px] w-full overflow-hidden rounded-xl">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <Button
                    variant="outline"
                    className="mb-4 bg-orange-500 hover:bg-orange-600 border-none text-white"
                  >
                    Suivez-nous
                  </Button>
                  <h2 className="text-4xl font-bold mb-2">{ad.title}</h2>
                  <h3 className="text-xl mb-2">{ad.subtitle}</h3>
                  <p className="text-lg opacity-90 max-w-xl">{ad.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};

export default AdCarousel;