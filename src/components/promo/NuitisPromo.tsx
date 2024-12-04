import { Button } from "@/components/ui/button";

const NuitisPromo = () => {
  return (
    <div className="space-y-4 mt-8">
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src="/lovable-uploads/cc5a4237-1fb2-4cbc-a83f-0477f2278211.png" 
          alt="Nuitis - Révolutionnez vos nuits" 
          className="w-full h-auto"
        />
        <div className="absolute bottom-8 left-8">
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