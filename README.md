# Upload Fronius inverter data to Solcast
Automates sending historical Fronius generation power data to Solcast's "Measurements - Rooftop Site" API to perform tuning for a site to improve forecasts and observations over time.

See Solcast API docs: https://docs.solcast.com.au/#measurements-rooftop-site


### How to run
- Install NPM packages `npm install`
- Run with NodeJS

```
$ node dist/index.js \
    --resourceId=[SOLCAST_SITE_RESOURCE_ID] \
    --apiKey=[SOLCAST_API_KEY] \
    --inverterIp=[INVERTER_IP]
```

#### Arguments
- `resourceId` - your Solcast site's Resource ID
- `apiKey` - find your Solcast API Key here https://toolkit.solcast.com.au/account
- `inverterIp` - the IP address of your Fronius inverter (e.g. `192.168.1.100`)
- `date` (optional) - the date of measurements you want to upload in `YYYY-MM-DD` format (e.g. `2020-09-14`), otherwise defaults to current day
- `updateInterval` (optional) - continuously update Solcast with the current day's measurements, frequency in seconds (e.g. 1800 = every 30 minutes)


### How to compile
- Compile with TypeScript `tsc`