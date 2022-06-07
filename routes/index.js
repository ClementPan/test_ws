const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const todos = require('./modules/todos')
const cats = require('./modules/cats')

router.use('/todos', todos)
router.use('/cats', cats)
router.use('/', home)
router.use('**', (req, res) => {
  res.status(200).json({
    returnCode: 200,
    body: {
      message: 'cound not find ' + req.originalUrl
    }
  })
})

module.exports = router