import { Match, Message, Swipe } from "@prisma/client";
import axios from "axios";

export const axiosBaseBackend = axios.create({
  baseURL: "/api",
});

/* Swipe user, isLike true for right, false for left */
/* match is non-null if it's a match */
export async function swipeUser(data: {
  swiperId: string;
  swipedId: string;
  isLike: boolean;
}): Promise<{
  swipe: Swipe;
  match: Match | null;
}> {
  const response = await axiosBaseBackend.post(`/swipes`, data);

  const result = response.data as {
    swipe: Swipe;
    match: Match | null;
  };

  return result;
}

/* Get all existing matches along with messages */
export async function getUserMatches({ id }: { id: string }): Promise<
  (Match & {
    messages: Message[];
  })[]
> {
  const response = await axiosBaseBackend.post(`/matches/userId=${id}`);

  const result = response.data as (Match & {
    messages: Message[];
  })[];

  return result;
}

/* Get messages for a match */
export async function getMatchMessages({
  matchId,
}: {
  matchId: string;
}): Promise<Message[]> {
  const response = await axiosBaseBackend.get(`/matches/${matchId}/messages`);

  const result = response.data as Message[];

  return result;
}

/* Send message to a match */
export async function sendMessage({
  matchId,
  senderId,
  content,
}: {
  matchId: string;
  senderId: string;
  content: boolean;
}): Promise<Message> {
  const response = await axiosBaseBackend.post(`/matches/${matchId}/messages`, {
    senderId,
    content,
  });

  const result = response.data as Message;

  return result;
}

/* Get swipe history */
export async function getSwipeHistory({
  userId,
}: {
  userId: string;
}): Promise<Swipe[]> {
  const response = await axiosBaseBackend.post(
    `/swipes/history?userId=${userId}`
  );

  const result = response.data as Swipe[];

  return result;
}

/* Get IDs user has already swiped */
export async function swipedUserIds({
  userId,
}: {
  userId: string;
}): Promise<string[]> {
  const response = await axiosBaseBackend.post(
    `/recommendations?userId=${userId}`
  );

  const result = response.data as {
    swipedUserIds: string[];
  };

  return result.swipedUserIds;
}
