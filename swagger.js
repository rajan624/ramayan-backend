const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});
const doc = {
  info: {
    version: "3.1.0", // by default: '1.0.0'
    title: "Ramayana Backend API", // by default: 'REST API'
    description: "", // by default: ''
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Local Server",
    },
    {
      url: "https://ramayan-backend.onrender.com",
      description: "Dev Server",
    },
  ],
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

swaggerAutogen(outputFile, routes, doc);
