require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const cors = require("cors");

const { Message, Room } = require("./mongodb");

app.use(express.json());
app.use(cors());

io.on("connection", function (socket) {
  console.log("connected", socket.id);
  socket.on("send-message", function (message) {
    console.log("send", message);
    const messageModel = new Message({
      user: message.user,
      text: message.text,
      canvas: message.canvas,
      date: message.date,
    });

    messageModel
      .save()
      .catch((error) => console.log("Error saving message:", error));
    socket.broadcast.emit("get-message", message);
  });
});

app.get("/room/:id", (_, response) => {
  Message.find({}).then((chatlog) => {
    response.json(chatlog.map((message) => message.toJSON()));
  });
});

const PORT = process.env.PORT;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
