import fs from 'fs'

export interface SaveFileUseCase {
    execute: (options: SaveFileOptions) => boolean
}

export interface SaveFileOptions {
    fileContent: string
    destination?: string
    fileName?: string
}

export class SaveFile implements SaveFileUseCase {
    constructor() {}

    execute({fileContent, destination = 'outputs', fileName = 'table'}: SaveFileOptions): boolean {
        try {
            fs.mkdirSync(destination, {recursive: true})
            fs.writeFileSync(`${destination}/${fileName}.txt`, fileContent)
            return true
        } catch (error) {
            return false
        }
    }
}