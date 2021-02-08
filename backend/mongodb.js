require("dotenv").config();
const mongoose = require("mongoose");

// mongodb uri
const uri = process.env.MONGODB_URI;

// connect to cluster
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
  });

/*----------------------------------------*/
// schema for message
const MessageSchema = new mongoose.Schema({
  user: String,
  canvas: String,
  date: Date,
  color: String,
  _id: String,
});

// transforms _id -> id and delete __v
MessageSchema.set("toJSON", {
  transform: (_doc, obj) => {
    delete obj.__v;
  },
});

/*----------------------------------------*/
const RoomSchema = new mongoose.Schema({
  _id: String,
  chatlog: [MessageSchema],
});

module.exports = {
  Message: mongoose.model("Message", MessageSchema),
  Room: mongoose.model("Room", RoomSchema),
};
