const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const path = require("path")

app.use(express.json())

const users = []

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './templates/signup.html'))
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './templates/login.html'))
})

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = { name: req.body.name, password: hashedPassword }
    users.push(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})
/*
app.post('/login', async (req, res) => {
  const user = users.find(user => user.name === req.body.name)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }
})*/

app.listen(3000)