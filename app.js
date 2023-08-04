const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const cookieParser = require('cookie-parser')

const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman',
    userId: '001'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday',
    userId: '002'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram',
    userId: '003'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!',
    userId: '004'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password',
    userId: '005'
  }
]

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieParser())

// setting routes
app.get('/', (req, res) => {
  res.render('login')
})

app.post('/', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  if (users.find(data => data.email === email)) {
    const userIndex = users.findIndex(data => data.email === email)
    if (users[userIndex].password === password) {
      const user = users[userIndex]
      res.cookie('userId', user.userId)
      return res.render('welcome', { user })
    } else {
      res.render('login', { wrongPwMsg: 'Incorrect password.' })
    }
  } else {
    res.render('login', { noAccountMsg: 'Can not found this account.' })
  }
})

// 當使用者成功登入後，取得使用者的 cookie 資料，並挑出對應的使用者資料給 profile.handlebars
app.get('/:id/profile', (req, res) => {
  const { userId } = req.cookies // 需先安裝 cookie-parser
  const userIndex = users.findIndex(data => data.userId === userId)
  const user = users[userIndex]
  console.log(user) // console.log 檢查是否有找對使用者
  res.render('profile', { user })
})

app.listen(port, () => {
  console.log(`The Express server is listening on http://localhost:${port}`)
})