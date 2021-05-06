const { server } = require("./index");

const PORT = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
