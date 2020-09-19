import { SolcastMeasurement, uploadMeasurements } from "./solcast";
import { getInverterData } from "./fronius";
import yargs from "yargs";

const argv = yargs
  .options({
    resourceId: { type: "string", demandOption: true },
    apiKey: { type: "string", demandOption: true },
    date: { type: "string", demandOption: false },
    inverterIp: { type: "string", demandOption: true },
    updateInterval: { type: "number", demandOption: false },
  })
  .help()
  .alias("help", "h").argv;

const solcastSiteResourceId = argv.resourceId;
const solcastApiKey = argv.apiKey;
const date = argv.date || new Date().toISOString().split("T")[0];
const inverterIp = argv.inverterIp;
const updateInterval = argv.updateInterval;

const main = async () => {
  try {
    console.log(`Getting measurements from inverter for ${date}`);
    const inverterData = await getInverterData(inverterIp, date);

    let measurements: SolcastMeasurement[] = [];

    for (const [key, value] of Object.entries(inverterData)) {
      measurements.push({
        period_end: new Date(
          new Date(`${date} 00:00:00`).setSeconds(parseInt(key)) // add seconds to date
        ).toISOString(), // convert to ISO string
        period: "PT5M", // data is in 5min intervals
        total_power: (value * 12) / 1000, // transform 5-min Wh to kWh (60min/5min=12)
      });
    }

    console.log(
      `Updating ${measurements.length} measurements to Solcast for ${date}`
    );
    await uploadMeasurements(
      solcastSiteResourceId,
      solcastApiKey,
      measurements
    );
  } catch(e) {
    console.error(`Error: ${e}`)
  }
};

main();

if (updateInterval) {
  setInterval(main, updateInterval * 1000);
}
