import { Application } from "@/types/application";

interface StackFeaturesProps {
  tools: Application[];
}

export const StackFeatures = ({ tools }: StackFeaturesProps) => {
  const allFeatures = tools.flatMap(tool => tool.features);
  const uniqueFeatures = Array.from(new Set(allFeatures));

  return uniqueFeatures.length > 0 ? (
    <div>
      <h3 className="text-lg font-medium text-gray-700 mb-4">
        Fonctionnalités disponibles
      </h3>
      <div className="flex flex-wrap gap-2">
        {uniqueFeatures.map((feature, index) => (
          <span
            key={index}
            className="px-3 py-1.5 bg-white/50 text-primary rounded-full text-sm"
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  ) : null;
};