const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.Server({
    port: 5001,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route();

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
