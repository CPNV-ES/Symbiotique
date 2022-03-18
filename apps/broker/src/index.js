const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const axios = require("axios").default;

const credentials = require("./credentials.json");
const { validateCredentials } = require("./lib/auth");

/**
 * @param {string} username
 * @param {Buffer} password
 */
aedes.authenticate = async (client, username, password, callback) => {
  console.log(`client ${client.id} sent an authentication request`);

  /**
   * Validate if the client is a microservice and not a device, if so, there is
   * no need to publish device-related events on the queue.
   */
  if (
    validateCredentials(
      { clientId: client.id, username, password },
      credentials
    )
  ) {
    return callback(null, true);
  }

  try {
    await axios.post("http://devices-auth:3000/auth/sign-in", {
      username,
      password: password.toString(),
    });

    aedes.publish({
      topic: `v1/devices/auth-success`,
      payload: Buffer.from(
        JSON.stringify({
          clientId: client.id,
        })
      ),
    });
  } catch (e) {
    aedes.publish({
      topic: `v1/devices/auth-failure`,
      payload: Buffer.from(JSON.stringify({ clientId: client.id })),
    });

    return callback(null, false);
  }

  callback(null, true);
};

aedes.on("subscribe", (subscriptions, client) => {
  const topics = subscriptions.map((subscription) => subscription.topic);

  console.log(
    `client ${client.id} subscribed to topics: [${topics.join(",")}]`
  );
});

aedes.on("publish", (packet, client) => {
  if (client) {
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
