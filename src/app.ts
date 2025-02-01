import fs from 'fs'
import {yarg} from "./config/plugins/yargs.plugin";

let outputMessage = ''
const base = yarg.b
const limit = yarg.l
const show = yarg.s
const headerMessage = `
==========================================
            Tabla del ${base}
==========================================\n
`
for (let i = 1; i <= limit; i++) {
    outputMessage += `${base} x ${i} = ${base*i}\n`
}

outputMessage = headerMessage + outputMessage

if (show) {
    console.log(outputMessage)
}

const outputPath = 'outputs'
fs.mkdirSync(outputPath, { recursive: true })
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage)