const express = require('express')
const router = express.Router()
const todos = require('../../models/todo')

router.get('/:id', (req, res) => {
  const id = req.params.id
  res.send({
    returnCode: 200,
    body: {
      route: ' /todos/' + id,
      message: 'You get id ' + id,
      todo: todos[id] || 'NO Data'
    }
  })
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  res.send({
    returnCode: 200,
    body: {
      route: '/:id/edit',
      message: 'You get edit id'
    }
  })
})

router.get('/', (req, res) => {
  res.send({
    returnCode: 200,
    body: {
      route: '/todos',
      message: 'You at todos',
      todos
    }
  })
})

module.exports = router


