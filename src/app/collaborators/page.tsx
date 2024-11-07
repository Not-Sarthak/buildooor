"use client";
import { Match, Message } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserMatches } from "src/utils/backend-api-helper";

async function Collab() {
  const [searchParams] = useSearchParams();
  const [match, setMatch] = useState<
    | (Match & {
        messages: Message[];
      })
    | null
  >(null);

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{match.user1Id}</p>
    </div>
  );
}

export default Collab;
