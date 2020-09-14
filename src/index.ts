import { SolcastMeasurement, uploadMeasurements } from "./solcast";
import { getInverterData } from "./fronius";
import yargs from "yargs";

const argv = yargs
  .options({
    resourceId: { type: "string", demandOption: true },
    apiKey: { type: "string", demandOption: true },
    date: { type: "string", demandOption: true },
    inverterIp: { type: "string", demandOption: true },
  })
  .help()
  .alias("help", "h").argv;

const solcastSiteResourceId = argv.resourceId;
const solcastApiKey = argv.apiKey;
const date = argv.date;
const inverterIp = argv.inverterIp;

const main = async () => {
  const inverterData = await getInverterData(inverterIp, date);

  let measurements: SolcastMeasurement[] = [];

  for (const [key, value] of Object.entries(inverterData)) {
    measurements.push({
      period_end: new Date(
        new Date(`${date} 00:00:00`).setSeconds(parseInt(key))
      ).toISOString(),
      period: "PT5M",
      total_power: (value * 12) / 1000,
    });
  }

  await uploadMeasurements(solcastSiteResourceId, solcastApiKey, measurements);
};

main();
