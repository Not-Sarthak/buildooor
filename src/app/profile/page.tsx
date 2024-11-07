"use client";

import { useEffect, useState } from "react";
import { getPassportById, getPassportsByScore, getCredentials } from "../../utils/api-helpers";

export default function TestApiComponent() {
  const [passportData, setPassportData] = useState(null);
  const [passportList, setPassportList] = useState(null);
  const [credentialsData, setCredentialsData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Example passport ID and page number for demonstration purposes
        const examplePassportId = "12345";
        const examplePageNumber = 1;

        // Fetch passport by ID
        console.log("Fetching passport by ID...");
        const passportResponse = await getPassportById(examplePassportId);
        console.log("Passport data:", passportResponse);
        setPassportData(passportResponse);

        // Fetch passports by score (paginated)
        console.log("Fetching passports by score...");
        const passportsResponse = await getPassportsByScore(examplePageNumber);
        console.log("Passports list data:", passportsResponse);
        setPassportList(passportsResponse);

        // Fetch credentials by passport ID
        console.log("Fetching credentials for passport ID...");
        const credentialsResponse = await getCredentials({ passport_id: examplePassportId });
        console.log("Credentials data:", credentialsResponse);
        setCredentialsData(credentialsResponse);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>API Test Component</h1>
      <div>
        <h2>Passport Data</h2>
        <pre>{JSON.stringify(passportData, null, 2)}</pre>
      </div>
      <div>
        <h2>Passport List</h2>
        <pre>{JSON.stringify(passportList, null, 2)}</pre>
      </div>
      <div>
        <h2>Credentials Data</h2>
        <pre>{JSON.stringify(credentialsData, null, 2)}</pre>
      </div>
    </div>
  );
}
