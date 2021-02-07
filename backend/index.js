require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");
const { Message, Room } = require("./mongodb");
const LZString = require("./lz-string");

app.use(express.json());
app.use(cors());

// connection to websocket
io.on("connection", function (socket) {
  console.log("connected", socket.id);

  // join websocket to chatroom(leave all other rooms)
  socket.on("join", function (newRoom) {
    if (socket.rooms.size > 0) {
      for (let room of socket.rooms) socket.leave(room);
    }
    socket.join(newRoom);
    console.log("joined", socket.rooms);
  });

  // handle sent messages
  socket.on("send-message", function (message) {
    let _id = "";
    for (let id of socket.rooms) _id = id;

    // emit to other sockets to get-message
    socket.to(_id).broadcast.emit("get-message", message);

    const messageModel = new Message({
      user: message.user,
      canvas: LZString.compressToEncodedURIComponent(message.canvas),
      date: message.date,
      color: message.color,
      _id: message.id,
    });

    // find room to save message
    Room.findOne({ _id: _id })
      .then(function (room) {
        room.chatlog.push(messageModel);
        room.save().catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  });
});

// get chatlog
app.get("/room/:id", function (request, response) {
  Room.findOne({ _id: request.params.id })
    .then(function (room) {
      response.json(
        room.chatlog.map(function (message) {
          message.toJSON();
          message.canvas = LZString.decompressFromEncodedURIComponent(
            message.canvas
          );
          return message;
        })
      );
    })
    .catch((error) => response.status(500).send("Server error."));
});

// Check room if exists
app.get("/room/", function (request, response) {
  Room.exists({ _id: request.query._id })
    .then(function (exists) {
      if (exists) {
        response.status(200).send("Room is joinable.");
      } else {
        response.status(400).send("Room does not exist.");
      }
    })
    .catch((error) => response.status(500).send("Server error."));
});

// Create room
app.post("/room/", function (request, response) {
  if (request.body._id.length < 8) {
    response.status(400).send("Room code must be at least 8 characters long.");
    return;
  }

  Room.exists({ id: request.body._id })
    .then(function (exists) {
      if (exists) {
        response
          .status(400)
          .send("Room already exists, try a different room code.");
      } else {
        const roomModel = new Room({
          _id: request.body._id,
          chatlog: [],
        });

        roomModel
          .save()
          .then(() => response.status(200).send("Room created."))
          .catch((error) => console.log("Error creating room:", error));
      }
    })
    .catch((error) => response.status(500).send("Server error."));
});

const PORT = process.env.PORT;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
