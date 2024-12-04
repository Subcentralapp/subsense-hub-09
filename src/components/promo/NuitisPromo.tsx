import { Button } from "@/components/ui/button";

const NuitisPromo = () => {
  return (
    <div className="space-y-4 mt-8">
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src="/lovable-uploads/816a1ebc-09b0-4dd0-903d-bf0b89cf7ba8.png" 
          alt="Nuitis - Révolutionnez vos nuits" 
          className="w-full h-auto"
        />
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => window.open('https://nuitis.com/', '_blank')}
          >
            Découvrez Nuitis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NuitisPromo;