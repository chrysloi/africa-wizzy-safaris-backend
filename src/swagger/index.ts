// const swaggerJsdoc = require("swagger-jsdoc");

import { PackageDocs } from "./packages.docs";
import { UserDocs } from "./user.docs";

export const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Africa wizzy safaris",
      description: "A tour company",
      contact: {
        name: "Eloi Chrysanthe",
        email: "eloi.chrysanthe@gmail.com",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerformat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    produces: ["application/json"],
    consumes: ["application/json"],
    paths: {
      ...PackageDocs,
      ...UserDocs,
    },
  },
};
