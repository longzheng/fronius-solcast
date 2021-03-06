"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const solcast_1 = require("./solcast");
const fronius_1 = require("./fronius");
const yargs_1 = __importDefault(require("yargs"));
require("log-timestamp");
const argv = yargs_1.default
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
const date = argv.date;
const inverterIp = argv.inverterIp;
const updateInterval = argv.updateInterval;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let currentDate = date ||
            new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000) // get date in current timezone
                .toISOString()
                .split("T")[0];
        console.log(`Getting measurements from inverter for ${currentDate}`);
        const inverterData = yield fronius_1.getInverterData(inverterIp, currentDate);
        let measurements = [];
        for (const [key, value] of Object.entries(inverterData)) {
            measurements.push({
                period_end: new Date(new Date(`${currentDate} 00:00:00`).setSeconds(parseInt(key)) // add seconds to date
                ).toISOString(),
                period: "PT5M",
                total_power: (value * 12) / 1000,
            });
        }
        console.log(`Updating ${measurements.length} measurements to Solcast for ${currentDate}`);
        yield solcast_1.uploadMeasurements(solcastSiteResourceId, solcastApiKey, measurements);
    }
    catch (e) {
        console.error(`Error: ${e}`);
    }
});
main();
if (updateInterval) {
    setInterval(main, updateInterval * 1000);
}
//# sourceMappingURL=index.js.map