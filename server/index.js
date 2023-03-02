//! this project has no persistance, no database
const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")

app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})
//* establishing connection
io.on("connection", (socket) => {
  console.log(`User: ${socket.id}`)

  socket.on("join_room", (data) => {
    socket.join(data)
    console.log(`user ${socket.id}: joined ${data}`)
  })
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data)
  })

  socket.on("disconnect", () => {
    console.log("user left")
  })
})
server.listen(3001, () => {
  console.log("Connected to 3001")
})
