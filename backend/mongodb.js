require("dotenv").config();
const mongoose = require("mongoose");

// mongodb cluster uri
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
});

// transforms _id -> id and delete __v
MessageSchema.set("toJSON", {
  transform: (_doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

/*----------------------------------------*/
const RoomSchema = new mongoose.Schema({
  room: [],
});

// transforms _id -> id and delete __v
RoomSchema.set("toJSON", {
  transform: (_doc, obj) => {
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = {
  Message: mongoose.model("Message", MessageSchema),
  Room: mongoose.model("Room", RoomSchema),
};
