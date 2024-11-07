"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";
import { getPassportsByScore } from "../../utils/api-helpers";
import { whyte } from "../fonts/font";
import { BuilderCard } from "src/components/cards/builder-card";
import { swipeUser } from "src/utils/backend-api-helper";
import { useRouter } from "next/navigation";

interface Passport {
  activity_score: number;
  identity_score: number;
  skills_score: number;
  score: number;
  passport_id: number;
  verified: boolean;
  main_wallet: string;
  passport_profile: {
    bio: string;
    display_name: string;
    image_url: string;
    location: string | null;
    name: string;
    tags: string[];
  };
}

const emptyStateVariants = {
  enter: { opacity: 0, scale: 0.9 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export default function Discover() {
  const [builders, setBuilders] = useState<Passport[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadBuilders();
  }, [currentPage]);

  const loadBuilders = async () => {
    try {
      setLoading(true);
      const response = await getPassportsByScore(currentPage);
      //@ts-ignore
      setBuilders((prev) => [...prev, ...response.passports]);
      setError(null);
    } catch (error) {
      setError("Failed to load builders. Please try again.");
      console.error("Error loading builders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (direction: "left" | "right") => {
    const { match, swipe } = await swipeUser({
      swiperId: "0x8Bc655575d98B9Fd98A0Fc1A71d5E12035E9c0b1",
      swipedId: "0x7f50726fF84Cb4f04fC887e110EdD6CEBC14BdDa",
      isLike: true,
    });

    if (match) {
      console.log("It's a match!", match);
      router.push(`/collaborators?matchId=${match.id}`);
    }

    // await new Promise((resolve) => setTimeout(resolve, 500));
    setBuilders((prev) => prev.slice(1));
    if (builders.length < 3) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading && builders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-80 h-40 rounded-xl overflow-hidden relative animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
          <p className="text-gray-300">Finding Buildooors</p>
        </div>

        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .animate-shimmer {
            animation: shimmer 1.5s infinite;
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <p className="text-red-400">{error}</p>
          <motion.button
            onClick={() => loadBuilders()}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen pt-16 px-4">
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-10 z-0"
        style={{ backgroundImage: "url('/bg.svg')" }}
      />
      <div className="max-w-md mx-auto pt-28 relative h-[36rem] z-10">
        <AnimatePresence mode="popLayout">
          {builders.length > 0 ? (
            builders
              .slice(0, 2)
              .reverse()
              .map((builder, index) => (
                <BuilderCard
                  key={builder.passport_id}
                  passport={builder}
                  isTop={index === builders.length - 1}
                  onSwipe={handleSwipe}
                />
              ))
          ) : (
            <motion.div
              variants={emptyStateVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8"
            >
              <h3 className={`text-2xl ${whyte.className} text-white mb-3`}>
                No More Builders
              </h3>
              <p className="text-gray-300">
                Check back later for more potential matches!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {builders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-20 left-0 right-0 flex justify-center gap-6 z-20"
          >
            <motion.button
              onClick={() => handleSwipe("left")}
              className="p-4 bg-red-500 hover:bg-red-600 rounded-full text-white shadow-2xl transform transition duration-200 ease-in-out hover:-translate-y-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={() => handleSwipe("right")}
              className="p-4 bg-green-500 hover:bg-green-600 rounded-full text-white shadow-2xl transform transition duration-200 ease-in-out hover:-translate-y-1"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-6 h-6" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
