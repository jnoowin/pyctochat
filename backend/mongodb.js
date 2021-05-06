require("dotenv").config();
const mongoose = require("mongoose");

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
