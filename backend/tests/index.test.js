const mongoose = require("mongoose");
const { Room } = require("../mongodb");
const supertest = require("supertest");
const { server, app } = require("../index");

const api = supertest(app);

const SHORT_ROOM_ID = "0123";
const EXISTING_ROOM_ID = "12345678";
const NONEXISTING_ROOM_ID = "PobcOIvd";
const NEW_ROOM = "newroom1";
const INVALID_INPUT = { invalid: "input" };

const ROOM_IS_JOINABLE = "Room is joinable.";
const ROOM_DOES_NOT_EXIST = "Room does not exist.";
const SERVER_ERROR = "Server error.";
const ROOM_ID_TOO_SHORT = "Room code must be at least 8 characters long.";
const ROOM_ALREADY_EXISTS = "Room already exists, try a different room code.";
const ROOM_CREATED = "Room created.";

describe("Backend test suite", () => {
    /**
     * Before all test, start the server and connect to MongoDB cluster
     */
    beforeAll((done) => {
        server.listen(process.env.PORT || 3000);
        mongoose.connect(
            process.env.MONGODB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            },
            done
        );
    });

    describe("Get chatlog of a room", () => {
        /**
         * 'id' is a string and matches an existing room id
         * TR1 (base choice) = [ “PobcOIvd”, “12345678” ]
         * T1 = Input: “12345678” (base); Expected output: Status 200, Array of Objects
         */
        test("Existing room", async () => {
            await api
                .get(`/api/room/${EXISTING_ROOM_ID}`)
                .expect(200)
                .then((response) =>
                    expect(Object.prototype.toString.call(response.body)).toBe(
                        "[object Array]"
                    )
                );
        });

        /** 'id" is a string and does not match an existing room id
         * TR2 = [ “PobcOIvd”, “PobcOIvd” ]
         * T2 = Input: “PobcOIvd”: Expected output: Status 500, “Server error.”
         */
        test("Non-existing room", async () => {
            await api
                .get(`/api/room/${NONEXISTING_ROOM_ID}`)
                .expect(500)
                .then((response) => expect(response.text).toBe(SERVER_ERROR));
        });
    });

    describe("Create a room", () => {
        /**
         * '_id' is a string that is < 8 and does not match an existing room
         * TR1 (base choice) = [ “PobcOIvd”, “0123”, “newroom1” ]
         * T1 = Input: “0123”; Expected output: Status 400, “Room code must be 8 characters long”
         */
        test("Room id < 8 and does not exist", async () => {
            await api
                .post("/api/room")
                .send({ _id: SHORT_ROOM_ID })
                .set("Accept", "application/json")
                .expect(400)
                .then((response) =>
                    expect(response.text).toBe(ROOM_ID_TOO_SHORT)
                );
        });

        /**
         * '_id' is a string that matches an existing room
         * TR2 = [ “PobcOIvd”, “0123”, “12345678” ]
         * T2 = Input: “12345678”; Expected output: Status 400, “Room already exists, try a different room code.”
         */
        test("Existing room id", async () => {
            await api
                .post("/api/room")
                .send({ _id: EXISTING_ROOM_ID })
                .set("Accept", "application/json")
                .expect(400)
                .then((response) =>
                    expect(response.text).toBe(ROOM_ALREADY_EXISTS)
                );
        });

        describe("Creating valid new room", () => {
            /**
             * '_id' is a string that does not match an existing room
             * TR3 = [ “PobcOIvd”, “01234567”, “newroom1” ]
             * T3 = Input: “newroom1”; Expected output: Status 200, “Room created”
             */
            test("Non-existing room", async () => {
                await api
                    .post("/api/room")
                    .send({ _id: NEW_ROOM })
                    .set("Accept", "application/json")
                    .expect(200)
                    .then((response) =>
                        expect(response.text).toBe(ROOM_CREATED)
                    );
            });

            afterEach((done) => {
                Room.deleteOne({ _id: NEW_ROOM }, done);
            });
        });
        /**
         * '_id' is an Object
         * TR4 = [ { invalid : “input” }, “0123”, “newroom1” ]
         * T4 = Input: “{ invalid : “input” }; Expected output: Status 400, “Invalid input”
         */
        test("Invalid input", async () => {
            await api
                .post("/api/room")
                .send({ _id: INVALID_INPUT })
                .set("Accept", "application/json")
                .expect(500)
                .then((response) => expect(response.text).toBe(SERVER_ERROR));
        });
    });

    describe("Check if room exists", () => {
        /**
         * '_id' is a string and matches existing room id
         * TR1 (base choice) = [ “PobcOIvd”, “12345678” ]
         * T1 = Input: “12345678” (base); Expected output: Status 200, "Room is joinable."
         */
        test("Existing room", async () => {
            await api
                .get("/api/room")
                .query({ _id: EXISTING_ROOM_ID })
                .expect(200)
                .then((response) =>
                    expect(response.text).toBe(ROOM_IS_JOINABLE)
                );
        });

        /**
         * '_id" is a string and does not match an existing room id
         * TR2 = [ “PobcOIvd”, “PobcOIvd” ]
         * T2 = Input: “PobcOIvd”: Expected output: Status 400, “Room does not exist”
         */
        test("Non-existing room", async () => {
            await api
                .get("/api/room")
                .query({ _id: NONEXISTING_ROOM_ID })
                .expect(400)
                .then((response) =>
                    expect(response.text).toBe(ROOM_DOES_NOT_EXIST)
                );
        });

        /**
         * '_id' is an Object and matches an existing room id
         * TR3 = [ { invalid : “input” }, “12345678” ] Infeasible - cannot match existing room while being invalid. Ignore matching existing room
         * T3 = Input: “{ invalid : “input” }”; Expected output: Status 500, "Server error.”
         */
        test("Invalid input", async () => {
            await api
                .get("/api/room")
                .query({ _id: INVALID_INPUT })
                .expect(500)
                .then((response) => expect(response.text).toBe(SERVER_ERROR));
        });
    });

    /**
     * After all test, close the server and disconnect from MongoDB cluster
     */
    afterAll((done) => {
        server.close();
        mongoose.connection.close(done);
    });
});
