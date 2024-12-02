import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  benefits: string[];
  index: number;
  isReversed?: boolean;
}

export const FeatureCard = ({
  title,
  description,
  icon,
  image,
  benefits,
  index,
  isReversed = false,
}: FeatureCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className={`flex flex-col ${
        isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } items-center gap-12`}
    >
      <div className="lg:w-1/2 space-y-6">
        <div className="inline-block p-3 bg-primary/10 rounded-2xl mb-4">
          {icon}
        </div>
        <h3 className="text-3xl font-bold text-gray-900">
          {title}
        </h3>
        <p className="text-lg text-gray-600">
          {description}
        </p>
        <ul className="space-y-3">
          {benefits.map((benefit) => (
            <motion.li
              key={benefit}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-gray-700"
            >
              <span className="h-2 w-2 bg-primary rounded-full" />
              {benefit}
            </motion.li>
          ))}
        </ul>
        <Button
          size="lg"
          onClick={() => navigate("/auth")}
          className="mt-6"
        >
          Essayer Gratuitement
        </Button>
      </div>
      <div className="lg:w-1/2">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <img
              src={image}
              alt={title}
              className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};