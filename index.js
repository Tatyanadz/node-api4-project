const express = require("express")
const db = require("./db.js")

require('dotenv').config()
const port = process.env.PORT

const server = express()
server.use(express.json())


//POST

server.post("/api/users", (req, res) => {
    const  { name, bio } = req.body
    if (name && bio) {
        db.insert({ name, bio })
          .then(result => {
              res.status(201).json({ name, bio })
          })
          .catch(err => {
              console.log("Error with POST/api/users", err)
              res.status(500).json({
                  errorMessage: "There was an error while saving the user to the database"
              })
          })
    } else {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }
})

//GET

server.get("/", (req, res) => {
    res.json({ message: 'hello world'})
})


server.get("/api/users/:id", (req, res) => {
    const id = req.params.id
    db.getUserById(id)
      .then(users => {
          if (users) {
              res.status(200).json(users)
          } else {
              res.status(404).json({
                  errorMessage: "The user with the specified ID does not exist."
              })
          }
      })
      .catch(err => {
          console.log("Error with GET/api/users", err)
          res.status(500).json({
            errorMessage: "The users information could not be retrieved"  
          })
      })
})

//DELETE

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id
    db.deleteUser(id)
      .then(result => {
          if (result) {
              res.status(200).json({ message: "Successfuly deleted"})
          } else {
              res.status(404).json({
                  errorMessage: "The user with the specified ID does not exist."
              })
          }
      })
      .catch(err => {
          console.log("Error with DELETE/api/users/:id", err);
          res.status(500).json({
             errorMessage: "The user could not be removed"
          })
      })
})

//PUT

server.put("/api/users/:id", (req, res) => {
    const user = req.body
    const id = req.params.id

    if (user.bio && user.name) {
        db.findById(id)
          .then(result => {
              if (result) {
                  db.updateUser(id, user).then(result => {
                      res.status(200).json(user)
                  })
              } else {
                  res.status(404).json({
                      errorMessage: "The user with the specified ID does not exist"
                  })
              }
          })
          .catch(err => {
              console.log("Error with PUT/api/users", err)
              res.status(500).json({
                  errorMessage: "The user information could not be modified."
              })
          })
    } else {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }
})
    

//LISTEN

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})