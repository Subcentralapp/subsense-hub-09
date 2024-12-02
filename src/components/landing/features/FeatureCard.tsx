import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  benefits: string[];
  index: number;
  isReversed?: boolean;
  isPremium?: boolean;
}

export const FeatureCard = ({
  title,
  description,
  icon,
  benefits,
  isPremium = false,
}: FeatureCardProps) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (isPremium) {
      const supportSection = document.getElementById('support-section');
      supportSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate("/auth");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-8 rounded-xl hover-scale"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-primary/10 rounded-xl">
          {icon}
        </div>
        {isPremium && (
          <Badge variant="secondary" className="gap-1">
            <Crown className="w-3 h-3" />
            Early Supporter
          </Badge>
        )}
      </div>

      <h3 className="text-2xl font-bold mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-6">
        {description}
      </p>

      <ul className="space-y-3 mb-8">
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
        onClick={handleAction}
        variant={isPremium ? "secondary" : "default"}
        className="w-full"
      >
        {isPremium ? "Devenir Early Supporter" : "Commencer Gratuitement"}
      </Button>
    </motion.div>
  );
};