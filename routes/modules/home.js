const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

// set root path
router.get('/', (req, res) => {
  res.send({
    returnCode: 200,
    body: {
      route: '/',
      message: 'You are at root'
    }
  })
})

module.exports = router

