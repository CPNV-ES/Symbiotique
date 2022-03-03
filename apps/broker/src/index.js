const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);

const credentials = {};

/**
 * @param {string} username
 * @param {Buffer} password
 */
aedes.authenticate = async (client, username, password, callback) => {
  console.log(`client ${client.id} sent an authentication request`);

  if (client.id.startsWith("mqttjs_")) {
    return callback(null, true);
  }

  if (
    username === credentials.username &&
    password.toString() === credentials.password
  ) {
    aedes.publish({
      topic: "v1/authentication/device",
      payload: Buffer.from(JSON.stringify({ clientId: client.id })),
      qos: 0,
    });

    callback(null, true);
  } else {
    console.log(`Wrong credentials`);

    callback(null, false);
  }
};

aedes.on("subscribe", (subscriptions, client) => {
  const topics = subscriptions.map((subscription) => subscription.topic);

  console.log(
    `client ${client.id} subscribed to topics: [${topics.join(",")}]`
  );
});

aedes.on("publish", (packet, client) => {
  if (packet.topic === "v1/devices-auth/credentials") {
    const { username, password } = JSON.parse(
      JSON.parse(packet.payload.toString()).data
    );

    if (!username || !password) {
      console.log("Could not load credentials");
    }

    Object.assign(credentials, { username, password });
  }
});

const port = 1883;

server.listen(port, () => {
  console.log("server started and listening on port ", port);

  setTimeout(() => {
    // Request credentials in order to authenticate the new devices
    aedes.publish({
      topic: "v1/devices-auth/request-credentials",
      qos: 0,
    });
  }, 3000);
});
