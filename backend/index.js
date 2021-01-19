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
  console.log("server connected", socket.id);
});

app.get("/room/:id", (request, response) => {
  Message.find({}).then((chatlog) => {
    response.json(chatlog.map((message) => message.toJSON()));
  });
});

app.post("/room/:id", (request, response) => {
  const body = request.body;

  const message = new Message({
    user: body.user,
    text: body.text,
    date: new Date(),
  });

  message
    .save()
    .then((result) => response.json(result))
    .catch((error) => console.log("Error saving message:", error));
});

const PORT = process.env.PORT;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
