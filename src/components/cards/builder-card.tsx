import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { Heart, X, Trophy, MapPin, Tag, BadgeCheck } from "lucide-react";
import { ScoreCard } from "./score-card";
import { whyte } from "../../app/fonts/font";

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

const cardVariants = {
  enter: { scale: 0.98, opacity: 0 },
  center: { scale: 1, opacity: 1 },
  exit: { scale: 0.98, opacity: 0, transition: { duration: 0.3 } },
};

export const BuilderCard = ({
  passport,
  isTop,
  onSwipe,
}: {
  passport: Passport;
  isTop: boolean;
  onSwipe: (direction: "left" | "right") => void;
}) => {
  const x = useMotionValue(0);
  const controls = useAnimation();

  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const leftIndicatorOpacity = useTransform(x, [-100, 0, 100], [1, 0, 0]);
  const rightIndicatorOpacity = useTransform(x, [-100, 0, 100], [0, 0, 1]);
  const scale = useTransform(x, [-300, -150, 0, 150, 300], [0.95, 0.97, 1, 0.97, 0.95]);

  const handleDragEnd = async (
    event: any,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const threshold = 100;
    const isSwipe = Math.abs(offset) > threshold || Math.abs(velocity) > 500;

    if (isSwipe) {
      const direction = offset > 0 ? "right" : "left";
      const rotation = direction === "right" ? 20 : -20;

      await controls.start({
        x: direction === "right" ? window.innerWidth + 300 : -window.innerWidth - 300,
        rotate: rotation,
        transition: { duration: 0.4, ease: "easeInOut" },
      });

      onSwipe(direction);
    } else {
      controls.start({
        x: 0,
        rotate: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 250, damping: 20 },
      });
    }
  };

  return (
    <motion.div
      style={{ x, rotate, scale }}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
      className={`absolute w-full touch-none select-none ${isTop ? "z-10" : "z-0"}`}
    >
      <div className="relative bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden w-full h-[520px]">
        {/* Image Section */}
        <div className="relative h-64 bg-gray-100">
          <img
            src={passport.passport_profile.image_url || "/api/placeholder/400/400"}
            alt={passport.passport_profile.name}
            className="w-full h-full object-cover"
            draggable="false"
          />

          {/* Swipe Indicators */}
          <motion.div style={{ opacity: leftIndicatorOpacity }} className="absolute top-8 left-8 bg-red-500/90 p-2 rounded-full shadow-md">
            <X className="w-5 h-5 text-white" />
          </motion.div>
          <motion.div style={{ opacity: rightIndicatorOpacity }} className="absolute top-8 right-8 bg-green-500/90 p-2 rounded-full shadow-md">
            <Heart className="w-5 h-5 text-white" />
          </motion.div>

          {/* Profile Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900/60 to-transparent text-white">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <h2 className={`text-xl font-semibold ${whyte.className}`}>
                  {passport.passport_profile.display_name}
                </h2>
                {passport.verified && <BadgeCheck className="w-5 h-5 text-accentPurple" />}
              </div>
              <div className="flex items-center gap-1 bg-purple-200/30 px-3 py-1 rounded-full text-purple-800 text-sm font-semibold">
                <Trophy className="w-4 h-4 text-purple-800" />
                {passport.score}
              </div>
            </div>
            {passport.passport_profile.location && (
              <div className="flex items-center gap-1 text-sm text-gray-300">
                <MapPin className="w-4 h-4" />
                {passport.passport_profile.location}
              </div>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 space-y-4 bg-white">
          {passport.passport_profile.bio && (
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
              {passport.passport_profile.bio}
            </p>
          )}

          <div className="grid grid-cols-3 gap-4">
            <ScoreCard label="Activity" score={passport.activity_score} color="purple" />
            <ScoreCard label="Identity" score={passport.identity_score} color="blue" />
            <ScoreCard label="Skills" score={passport.skills_score} color="indigo" />
          </div>

          {passport.passport_profile.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {passport.passport_profile.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
