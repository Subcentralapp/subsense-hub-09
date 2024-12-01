import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const partnerAds = [
  {
    title: "Spotify Premium",
    description: "3 mois gratuits pour tout nouvel abonnement",
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=500&q=80",
    link: "https://spotify.com",
  },
  {
    title: "Microsoft 365",
    description: "-50% sur votre abonnement annuel",
    image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=500&q=80",
    link: "https://microsoft.com",
  },
  {
    title: "Adobe Creative Cloud",
    description: "Essai gratuit de 30 jours + 20% de réduction",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=80",
    link: "https://adobe.com",
  },
];

const AdCarousel = () => {
  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Nos Partenaires</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {partnerAds.map((ad, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-semibold text-lg">{ad.title}</h3>
                      <p className="text-sm opacity-90">{ad.description}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <Button className="w-full" asChild>
                      <a href={ad.link} target="_blank" rel="noopener noreferrer">
                        Voir l'offre
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default AdCarousel;