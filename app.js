// settings
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

// use body-parser
app.use(bodyParser.urlencoded({ extended: true }))

//  connect database
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

// require Todo
const Todo = require('./models/todo') // 載入 Todo model
const { urlencoded } = require('body-parser')
const todo = require('./models/todo')

// connection error 
db.on('error', () => {
  console.log('mongodb error!')
})

// connection success
db.once('open', () => {
  console.log('MongoDB connected!')
})

//set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// set routes
app.get('/', (req, res) => {
  Todo.find()  // find all data, not specific one.
    .lean() // don't process it, Mongoose.
    .then(todos => { res.render('index', { todos: todos }) }) //use the todos data found by mongoose to bulit index.
    .catch(error => console.error(error))
})

// from index to new
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

// from new to index
app.post('/todos', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name: name })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

// detail
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

// edit: from index(get) or detail to edit
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

// edit: from edit(post) to index
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  // 使用 post 送入資料，放在 req.body。 {} 解構賦值
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      console.log(todo)
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

// remove 
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// start to listen
app.listen(port, () => {
  console.log(`The app is listening on http://localhost:${port}.`)
})
