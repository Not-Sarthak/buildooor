import axios from "axios";

export const axiosBase = axios.create({
  baseURL: "https://api.talentprotocol.com/api/v2",
  headers: {
    "X-API-KEY": process.env.NEXT_PUBLIC_TALENT_API_KEY,
  },
});

export async function getPassportById(
  id: number | string
): Promise<TTalentPassportResponse> {
  const response = await axiosBase.get(`/passports/${id}`);

  const data: TTalentPassportResponse = response.data;

  return data;
}

export async function getPassportsByScore(
  currentPage: number = 1
): Promise<TTalentPassportListResponse> {
  const queryParams = new URLSearchParams({
    page: currentPage.toString(),
  });

  const response = await axiosBase.get(`/passports?${queryParams.toString()}`);

  const data: TTalentPassportListResponse = response.data;

  return data;
}

export async function getCredentials({
  passport_id,
}: {
  passport_id: string;
}): Promise<TCredentialsResponse> {
  const queryParams = new URLSearchParams({
    passport_id,
  });

  // TODO: Add auth in headers
  const response = await axiosBase.get(
    `/passport_credentials?${queryParams.toString()}`
  );

  const data: TCredentialsResponse = response.data;

  console.log(data);

  return data;
}
