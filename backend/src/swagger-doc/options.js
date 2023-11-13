const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "🎾 Tennis League",
      version: "1.0.0",
      description: "Backend to manage a tennis league.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Julian Rodriguez",
        url: "https://github.com/julandrod",
        email: "julian.andres.rodriguez@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:5000/`,
      },
    ],
    securityDefinitions: {
      Bearer: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    security: [
      {
        Bearer: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = options;
