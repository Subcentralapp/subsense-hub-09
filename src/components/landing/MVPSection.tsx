import { motion } from "framer-motion";
import { HeroTitle } from "./mvp/HeroTitle";
import { FeatureList } from "./mvp/FeatureList";
import { ImageSection } from "./mvp/ImageSection";
import { StackSection } from "./mvp/StackSection";
import { ToolsSection } from "./mvp/ToolsSection";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const MVPSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroTitle />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <FeatureList />
          <ImageSection />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-24 sm:mt-32"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 p-6 sm:p-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-12 sm:space-y-16"
            >
              <StackSection />
              <motion.div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              <ToolsSection />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};