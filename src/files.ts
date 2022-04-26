import { Router, Request, Response } from 'express';
import { encryptFile, dencryptFile } from './cript-lib';
import multer from 'multer'
import { randomUUID, constants } from 'crypto'
import { Buffer } from 'buffer';
import serveIndex from 'serve-index'

import fs from 'fs';
import path from 'path';
import 'dotenv/config'

const {FILE_PATH} = process.env;

interface FileMetadata  {
    originalname: string,
    mimetype: string,
    size: number,
    encoding: "base64" | "7bit",
    data: string
}

const route = Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

route.get('/', serveIndex(path.join(<string>FILE_PATH), {'icons': true}))


route.post('/upload', upload.single('arquivo'), (req: Request, res: Response) => {

    
    const fileName = path.join(<string>FILE_PATH) + "/" +randomUUID();
    const fileData = encryptFile(<Buffer>req.file?.buffer);

    let fileJson: FileMetadata = {
        originalname: <string>req.file?.originalname,
        mimetype: <string>req.file?.mimetype,
        size: <number>req.file?.size,
        encoding: "base64",
        data: fileData.toString("base64")
    }

    //console.log(req.file)
    fs.writeFileSync(fileName, JSON.stringify(fileJson))
    res.json('concluido')
    
})

route.get('*', async (req: Request, res: Response) => {

    const fileName = req.url;
    const fileString = fs.readFileSync(__dirname + '/../media/'+ fileName).toString()
    const fileJson: FileMetadata = JSON.parse(fileString);
    const result = dencryptFile(fileJson.data)

    res.writeHead(200, {
        'Content-Type': fileJson.mimetype,
        'Content-disposition': 'attachment;filename=' + 'encrypted_' + fileJson.originalname,
        'Connection': 'close',
    })
    res.end(result)


})


export default route;