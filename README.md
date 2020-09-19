# Upload Fronius inverter data to Solcast
Automates sending historical Fronius generation power data to Solcast's "Measurements - Rooftop Site" API to perform tuning for a site to improve forecasts and observations over time.

See Solcast API docs: https://docs.solcast.com.au/#measurements-rooftop-site


### How to run
- Run with NodeJS

```
$ node dist/index.js \
    --resourceId=[SOLCAST_SITE_RESOURCE_ID] \
    --apiKey=[SOLCAST_API_KEY] \
    --inverterIp=[INVERTER_IP] \
    --date=[REPORT_DATE]            
```

### Arguments
- `SOLCAST_SITE_RESOURCE_ID` - your Solcast site's Resource ID
- `SOLCAST_API_KEY` - find your Solcast API Key here https://toolkit.solcast.com.au/account
- `INVERTER_IP` - the IP address of your Fronius inverter (e.g. `192.168.1.100`)
- `REPORT_DATE` (optional) - the date of measurements you want to upload in `YYYY-MM-DD` format (e.g. `2020-09-14`), otherwise defaults to current day


### How to compile
- Install NPM packages `npm install`
- Compile with TypeScript `tsc`