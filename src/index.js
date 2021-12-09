const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);

aedes.authenticate = (client, username, password, callback) => {
  console.log(`client ${client.id} sent an authentication request`);

  callback(null, true);
};

aedes.on("subscribe", (subscriptions, client) => {
  const topics = subscriptions.map((subscription) => subscription.topic);

  console.log(
    `client ${client.id} subscribed to topics: [${topics.join(",")}]`
  );
});

aedes.on("publish", (packet, client) => {
  if (packet.topic === "temperature") {
    console.log(
      `client ${client.id} sent value: ${packet.payload.toString()} topic : ${
        packet.topic
      }`
    );
  }
});

const port = 1883;

server.listen(port, () => {
  console.log("server started and listening on port ", port);
});
