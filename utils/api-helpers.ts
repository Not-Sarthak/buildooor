import axios from "axios";

export const axiosBase = axios.create({
  baseURL: "https://api.talentprotocol.com/api/v2",
  headers: {
    "X-API-KEY": process.env.NEXT_PUBLIC_TALENT_API_KEY,
  },
});

export async function getPassportsByScore(
  currentPage: number = 1
): Promise<TTalentData> {
  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
  });

  console.log(queryParams.toString());

  const response = await axiosBase.get(`/passports?${queryParams.toString()}`);

  const data = response.data;

  console.log(data);

  return data;
}

export async function getCredentials({
  passport_id: string,
}): Promise<TTalentData> {
  const response = await axiosBase.get(`/passport_credentials?`, {}, {});

  const data = response.data;

  console.log(data);

  return data;
}
