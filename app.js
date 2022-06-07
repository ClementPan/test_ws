// settings
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cors = require('cors')

// require routes
const routes = require('./routes')

// require Todo
const { urlencoded } = require('body-parser')


app.use(cors())

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.listen(port, () => {
  console.log(`The app is listening on http://localhost:${port}.`)
})
