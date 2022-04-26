const path = require('path')

import express, { Express, Request, Response, Router } from 'express';
import serveIndex from 'serve-index'

import files from './files'

const app: Express = express();
const route = Router()

app.use(express.json())

route.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
})



route.use('/files', files)

app.use(route)

app.listen(3333, () => console.log('server running on port 3333'))