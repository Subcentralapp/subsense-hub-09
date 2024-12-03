import { Application } from "@/types/application";

interface StackFeaturesProps {
  tools: Application[];
}

export const StackFeatures = ({ tools }: StackFeaturesProps) => {
  const allFeatures = tools.flatMap(tool => tool.features);
  const uniqueFeatures = Array.from(new Set(allFeatures));

  return uniqueFeatures.length > 0 ? (
    <div>
      <h4 className="font-medium text-gray-700 mb-2">
        Fonctionnalités disponibles
      </h4>
      <div className="flex flex-wrap gap-2">
        {uniqueFeatures.map((feature, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  ) : null;
};