import { motion } from "framer-motion";
import { whyte } from "../../app/fonts/font";

export const ScoreCard = ({
  label,
  score,
  color,
}: {
  label: string;
  score: number;
  color: "purple" | "blue" | "indigo";
}) => {
  const gradients = {
    purple: "from-purple-100 to-purple-300",
    blue: "from-blue-100 to-blue-300",
    indigo: "from-indigo-100 to-indigo-300",
  };

  return (
    <motion.div
      className={`bg-gradient-to-br ${gradients[color]} p-4 rounded-xl text-center`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div className={`text-xl font-semibold ${whyte.className}`}>{score}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </motion.div>
  );
};
