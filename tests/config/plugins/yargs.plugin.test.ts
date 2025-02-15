import {yarg} from "../../../src/config/plugins/yargs.plugin"
import exp = require("node:constants");

const runCommand = async (args: string[]) => {
    process.argv = [...process.argv, ...args]
    const {yarg} = await import('../../../src/config/plugins/yargs.plugin')
    return yarg
}

describe('YargsPlugin tests', () => {
    const originalArgv = process.argv

    beforeEach(() => {
        process.argv = originalArgv
        jest.resetModules()
    })

    test('Should return default values', async () => {
        const argv = await runCommand(['-b', '5'])

        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }))
    })

    test('Should return configuration with custom values', async () => {
        const argv = await runCommand(
            ['-b', '7', '-l', '15', '-n', 'table7', '-d', 'new-outputs', '-s']
        )

        expect(argv).toEqual(expect.objectContaining({
            b: 7,
            l: 15,
            s: true,
            n: 'table7',
            d: 'new-outputs',
        }))
    })
})