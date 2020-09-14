import axios from "axios";

const solcastApiBase = "https://api.solcast.com.au";

export const uploadMeasurements = async (
  resourceId: string,
  apiKey: string,
  measurements: SolcastMeasurement[]
) => {
  const response = await axios.post(
    `${solcastApiBase}/rooftop_sites/${resourceId}/measurements?api_key=${apiKey}`,
    {
      measurements: measurements,
    }
  );
};

export type SolcastMeasurement = {
  period_end: string;
  period: "PT5M";
  total_power: number;
};
