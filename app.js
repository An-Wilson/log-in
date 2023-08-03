const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

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
      res.render('welcome', { user })
    } else {
      res.render('login', { wrongPwMsg: 'Incorrect password.' })
    }
  } else {
    res.render('login', { noAccountMsg: 'Can not found this account.' })
  }
})

app.listen(port, () => {
  console.log(`The Express server is listening on http://localhost:${port}`)
})