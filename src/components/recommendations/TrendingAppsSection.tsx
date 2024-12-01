import { usePromoApps } from "@/hooks/usePromoApps";
import { TrendingAppCard } from "./TrendingAppCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const TrendingAppsSection = () => {
  const { data: trendingApps, isLoading } = usePromoApps();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const categories = Object.keys(trendingApps || {});

  if (!categories.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Applications Tendances
        </h2>
      </div>

      <Tabs defaultValue={categories[0]} className="w-full">
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md p-1 text-muted-foreground w-full">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingApps[category].map((item: any) => (
                <TrendingAppCard
                  key={item.app.id}
                  app={item.app}
                  promoCode={item.promoCode}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};