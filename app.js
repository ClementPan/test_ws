// settings
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const SocketServer = require('ws').Server
// const bodyParser = require('body-parser')
// const methodOverride = require('method-override')
// const { urlencoded } = require('body-parser')
// const routes = require('./routes')

app.use(cors())
// app.use(methodOverride('_method'))
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(routes)

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))
const wss = new SocketServer({ server })

wss.on('connection', ws => {
  console.log('[[[ Client connected')
  ws.on('message', m => {
    console.log('[[[ on message: ', m.toString());
  })
  ws.on('close', () => {
    console.log('[[[ Close connected')
  })
})