import { motion } from "framer-motion";

export const ImageSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative mt-8 md:mt-0"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl" />
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2940&auto=format&fit=crop"
          alt="Interface de l'application"
          className="rounded-2xl shadow-2xl w-full h-auto object-cover"
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 to-transparent flex items-end">
          <p className="text-white text-base sm:text-xl font-medium p-4 sm:p-8">
            Conçu pour la simplicité et l'efficacité
          </p>
        </div>
      </div>
    </motion.div>
  );
};