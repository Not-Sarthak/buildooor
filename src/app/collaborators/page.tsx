"use client";
import { Match, Message } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserMatches } from "src/utils/backend-api-helper";
import { Send } from "lucide-react";

const Collab = () => {
  const [searchParams] = useSearchParams();
  const [match, setMatch] = useState<(Match & { messages: Message[] }) | null>(
    null
  );
  const [newMessage, setNewMessage] = useState("");

  async function loadMatch() {
    const searchParams = new URLSearchParams(window.location.search);
    const matchs = await getUserMatches({
      id: "0x8Bc655575d98B9Fd98A0Fc1A71d5E12035E9c0b1",
    });
    setMatch(
      matchs.find((match) => match.id === searchParams.get("matchId")) ?? null
    );
  }

  useEffect(() => {
    loadMatch();
  }, []);

  if (!match) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A0B0F]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Dummy messages for UI demonstration
  const dummyMessages = [
    {
      id: 1,
      content: "Hey, how are you?",
      senderId: match.user1Id,
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      content: "I'm good, thanks! How about you?",
      senderId: match.user2Id,
      timestamp: new Date().toISOString(),
    },
    {
      id: 3,
      content: "Working on some interesting projects lately",
      senderId: match.user1Id,
      timestamp: new Date().toISOString(),
    },
    {
      id: 4,
      content: "That sounds great! Would love to hear more about it.",
      senderId: match.user2Id,
      timestamp: new Date().toISOString(),
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-[#0A0B0F]">
      {/* Container to center content */}
      <div className="flex flex-col h-full max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="border-b border-gray-800 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center">
                <span className="text-purple-400 font-medium">
                  {match.user1Id.slice(0, 2)}
                </span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-100">
                  {match.user1Id.slice(0, 10)}...
                </h1>
                <p className="text-sm text-gray-400">Builder Score: 95</p>
              </div>
            </div>
            <div className="px-4 py-2 rounded-lg bg-gray-800">
              <p className="text-sm text-gray-300">
                {match.user1Id.slice(0, 6)}...{match.user1Id.slice(-4)}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-4">
            {dummyMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === match.user1Id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === match.user1Id
                      ? "bg-purple-900/30 border border-purple-500/20"
                      : "bg-gray-800/50 border border-gray-700"
                  }`}
                >
                  <p className="text-gray-100">{message.content}</p>
                  <p className="text-xs mt-1 text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-800 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800/50 text-gray-100 rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-purple-500/20 text-purple-400 rounded-lg px-6 py-2 border border-purple-500/20 hover:bg-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors duration-200"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Collab;
