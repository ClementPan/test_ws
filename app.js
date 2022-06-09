// settings
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const SocketServer = require('ws').Server
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const { urlencoded } = require('body-parser')
// const routes = require('./routes')

// data
const { todos } = require('./models/todo')
const { users } = require('./models/user')

app.use(cors())
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(routes)

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`))
const wss = new SocketServer({ server })

wss.on('connection', ws => {
  console.log('[[[ Client connected')

  ws.on('message', m => {
    setTimeout(() => {
      const data = JSON.parse(m)
      const { content } = data
      const returnContent = setReturnContent(content)
      const resMsg = {
        from: 'server',
        content: returnContent
      }
      ws.send(JSON.stringify(resMsg))
    }, 1000);
  })

  ws.on('close', () => console.log('[[[ Close connected'))
})

const setReturnContent = (content) => {
  if (content === '') {
    return 'SAY SOMETHING!!!'
  } else if (content === 'users') {
    return users
  } else if (content === 'todos') {
    return todos
  }
  return 'SURE WILL DO'

}