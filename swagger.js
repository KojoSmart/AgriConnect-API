const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "AgriConnect-Management-API",
    description: "Description",
  },
//   host:"advertisement-app-1-gy0x.onrender.com",
host:"localhost:8008",
  //  host: "agriconnect-api-aa28.onrender.com",
   schemes: ["http"],
  // schemes: ["https"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  // security : [{bearerAuth: [] }],
};

const outputFile = "./swagger-output.json";
const routes = [" ./app.js"];

swaggerAutogen(outputFile, routes, doc);
