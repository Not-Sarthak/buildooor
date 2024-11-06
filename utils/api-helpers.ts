import axios from "axios";

export const axiosBase = axios.create({
  baseURL: "https://api.talentprotocol.com/api/v2/passports",
  headers: {
    "X-API-KEY": process.env.NEXT_PUBLIC_TALENT_API_KEY,
  },
});

export async function getPassportsByScore() {
  const response = await axiosBase.get("/");
  return response.data;
}
