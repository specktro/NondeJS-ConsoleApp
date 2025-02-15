import {SaveFile} from "../../../src/domain/use-cases/save-file.use-case";
import fs from "fs";

describe('SaveFileUseCase', () => {
    afterEach(() => {
        if(fs.existsSync('outputs')) {
            fs.rmSync('outputs', {recursive: true})
        }
    })

    test('Should save file with default values', () => {
        const filePath = 'outputs/table.txt'
        const saveFile = new SaveFile()
        const options = {fileContent: 'test content'}

        const result = saveFile.execute(options)
        const fileExist = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath, 'utf8')

        expect(result).toBeTruthy()
        expect(fileExist).toBeTruthy()
        expect(fileContent).toBe(options.fileContent)
    })

    test('Should save file with custom values', () => {
        const saveFile = new SaveFile()
        const options = {
            fileContent: 'test content',
            destination: 'custom-outputs',
            fileName: 'custom-table-name',
        }
        const filePath = `${options.destination}/${options.fileName}.txt`

        const result = saveFile.execute(options)
        const fileExist = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath, 'utf8')

        expect(result).toBeTruthy()
        expect(fileExist).toBeTruthy()
        expect(fileContent).toBe(options.fileContent)
    })

    test('Should return false if directory could not be created', () => {
        const saveFile = new SaveFile()
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync')
            .mockImplementation(() => { throw new Error('Test error message') })
        const result = saveFile.execute({fileContent: 'test content'})
        expect(result).toBeFalsy()
        mkdirSpy.mockRestore()
    })

    test('Should return false if file could not be created', () => {
        const saveFile = new SaveFile()
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync')
            .mockImplementation(() => { throw new Error('Test error message') })
        const result = saveFile.execute({fileContent: 'test content'})
        expect(result).toBeFalsy()
        writeFileSpy.mockRestore()
    })
})