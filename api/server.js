const express = require('express')
const api = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const https = require('https')
const fs = require('fs')
const path = require('path')
const port = 3000
const { EscPos } = require('@tillpos/xml-escpos-helper')
const connectToPrinter = require('./connectToPrinter')
const generateTemplate = require('./generateTemplate')

api.use(cors())
api.use(bodyParser.json())

api.post('/:host', async (req, res) => {
  const host = req.params.host
  try {
    const template = generateTemplate(req.body)
    const PRINTER = {
      device_name: 'EPSONC761F4',
      host: host,
      port: 9100,
    }

    const message = EscPos.getBufferFromTemplate(template, {})
    await connectToPrinter(PRINTER.host, PRINTER.port, message)
    res.status(200).send(JSON.stringify({ message: 'Print successful.' }))
  } catch (error) {
    res.status(500).send(JSON.stringify({ error: error.message }))
  }
})

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, '/certs/localhost+1-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '/certs/localhost+1.pem')),
}

const server = https.createServer(httpsOptions, api).listen(port, () => {
  console.log('server running at ' + port)
})
