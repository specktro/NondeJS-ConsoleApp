import yargs from 'yargs'
import {hideBin} from "yargs/helpers"

export const yarg = yargs(process.argv)
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Multiplication table base',
    })
    .option('l', {
        alias: 'limit',
        type: 'number',
        default: 10,
        describe: 'Multiplication table limit',
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false,
        describe: 'Show multiplication table',
    })
    .check((argv, _) => {
        if (argv.b < 1) {
            throw new Error('Error: --base must be greater than 0')
        }

        return true
    })
    .parseSync()