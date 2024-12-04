import { Button } from "@/components/ui/button";

const NuitisPromo = () => {
  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Découvrez nos partenaires qui nous soutiennent
      </h2>
      <div className="relative">
        <img 
          src="/lovable-uploads/cc5a4237-1fb2-4cbc-a83f-0477f2278211.png" 
          alt="Nuitis - Révolutionnez vos nuits" 
          className="w-full h-auto rounded-lg"
        />
        {/* Button on banner for desktop only */}
        <div className="hidden sm:block absolute bottom-8 left-8">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 text-base rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => window.open('https://nuitis.com/', '_blank')}
          >
            Découvrez Nuitis
          </Button>
        </div>
      </div>
      {/* Button below banner for mobile only */}
      <div className="sm:hidden">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-1 text-sm rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={() => window.open('https://nuitis.com/', '_blank')}
        >
          Découvrez Nuitis
        </Button>
      </div>
    </div>
  );
};

export default NuitisPromo;