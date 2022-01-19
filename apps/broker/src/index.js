const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const axios = require("axios").default;

aedes.authenticate = async (client, username, password, callback) => {
  console.log(`client ${client.id} sent an authentication request`);

  try {
    await axios.post("http://devices-auth:3000/auth/sign-in", {
      username,
      password,
    });
  } catch (e) {
    await axios.post("http://devices:3000/devices", {
      clientId: client.id,
      state: "AUTHENTICATION_FAILED",
    });

    return callback(null, false);
  }

  try {
    await axios.get(`http://devices:3000/devices/${client.id}`);
  } catch (e) {
    if (e.response.status === 404) {
      // If the device does not exist in the devices database, create a new one
      await axios.post(`http://devices:3000/devices`, {
        clientId: client.id,
      });
    }
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
