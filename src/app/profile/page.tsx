"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCredentials } from "../../utils/api-helpers";
import { useAccount } from "wagmi";

interface PassportProfile {
  bio: string;
  display_name: string;
  image_url: string;
  location: string | null;
  name: string;
  tags: string[];
}

interface Credential {
  calculating_score: boolean;
  category: "Activity" | "Identity" | "Skills";
  earned_at: string | null;
  id: string;
  last_calculated_at: string | null;
  max_score: number;
  name: string;
  onchain_at: string | null;
  score: number;
  type: string;
  value: string | null;
}

interface CredentialsResponse {
  passport_credentials: Credential[];
  passport_profile?: PassportProfile;
}

const MinimalProfile = () => {
  const [credentials, setCredentials] = useState<CredentialsResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Credentials");
  const [activeCategory, setActiveCategory] = useState("All");
  const account = useAccount();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // TODO: Test
      const result = await getCredentials({
        passport_id: account.address!,
      });
      //@ts-ignore
      setCredentials(result);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getTotalScores = () => {
    if (!credentials?.passport_credentials) return { total: 0, max: 0 };

    return credentials.passport_credentials.reduce(
      (acc, curr) => ({
        total: acc.total + (curr.score || 0),
        max: acc.max + (curr.max_score || 0),
      }),
      { total: 0, max: 0 }
    );
  };

  const filteredCredentials = credentials?.passport_credentials?.filter(
    (cred) => activeCategory === "All" || cred.category === activeCategory
  );

  const { total: totalScore, max: maxScore } = getTotalScores();
  const percentage =
    maxScore > 0 ? Math.floor((totalScore / maxScore) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-4 pt-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-sm">{percentage}%</span>
              </div>
              <h1 className="text-xl font-normal">
                Talent Passport ID #2912865
              </h1>
            </div>
            <p className="text-white/60 text-sm mt-1">
              Score: {totalScore}/{maxScore}
            </p>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-16">
          <button className="w-full p-2 bg-white text-black rounded-xl hover:bg-white/90 transition-colors">
            Collaborators
          </button>
          <button className="w-full p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
            Settings
          </button>
        </div>

        <div className="flex gap-8 mb-8 border-b border-white/10">
          {["Credentials", "Nominated by"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm transition-colors relative ${
                activeTab === tab
                  ? "text-white"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-8">
          {["All", "Activity", "Identity", "Skills"].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                activeCategory === category
                  ? "bg-white text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 text-red-400 rounded-xl mb-6">
            {error}
          </div>
        )}

        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCredentials?.map((credential) => (
              <motion.div
                key={credential.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-normal">{credential.name}</h3>
                    <p className="text-white/60 text-sm mt-1">
                      {credential.value || "No value set"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm bg-white/10 px-2 py-1 rounded-md">
                      {credential.score}/{credential.max_score}
                    </span>
                    <span className="text-white/40 text-xs mt-1">
                      {credential.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MinimalProfile;
