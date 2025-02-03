// import fs from 'fs'
import {yarg} from "./config/plugins/yargs.plugin";
import {ServerApp} from "./presentation/server-app";

(async () => {
    await main()
})()

async function main() {
    const {b: base, l: limit, s: showTable, n: fileName, d: destination} = yarg
    ServerApp.run({base, limit, showTable, fileName, destination})
}