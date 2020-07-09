const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === "production"

const http = require("http")
const app = require("express")()
const server = http.createServer(app)

//Nuxt
const { Nuxt, Builder } = require("nuxt")
// We instantiate Nuxt.js with the options
const config = require("./nuxt.config.js")
config.dev = !isProd
const nuxt = new Nuxt(config)
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}
// レンダラー接続
app.use(nuxt.render)

// Socket.io
const io = require("socket.io")(server)
const rooms = {};
io.on("connection", socket => {
  console.log("user connected", socket.id);

  let curRoom = null;

  socket.on("joinRoom", data => {
    const { room } = data;

    if (!rooms[room]) {
      rooms[room] = {
        name: room,
        occupants: {},
      };
    }

    const joinedTime = Date.now();
    rooms[room].occupants[socket.id] = joinedTime;
    curRoom = room;

    console.log(`${socket.id} joined room ${room}`);
    socket.join(room);

    socket.emit("connectSuccess", { joinedTime });
    const occupants = rooms[room].occupants;
    io.in(curRoom).emit("occupantsChanged", { occupants });
  });

  socket.on("send", data => {
    io.to(data.to).emit("send", data);
  });

  socket.on("broadcast", data => {
    socket.to(curRoom).broadcast.emit("broadcast", data);
  });

  socket.on("disconnect", () => {
    console.log('disconnected: ', socket.id, curRoom);
    if (rooms[curRoom]) {
      console.log("user disconnected", socket.id);

      delete rooms[curRoom].occupants[socket.id];
      const occupants = rooms[curRoom].occupants;
      socket.to(curRoom).broadcast.emit("occupantsChanged", { occupants });

      if (occupants == {}) {
        console.log("everybody left room");
        delete rooms[curRoom];
      }
    }
  });
});

//立ち上げ
// Listen the server
server.listen(port, "0.0.0.0")
console.log("Server listening on localhost:" + port) // eslint-disable-line no-console
