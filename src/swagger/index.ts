// const swaggerJsdoc = require("swagger-jsdoc");

import { PackageDocs } from "./packages.docs";

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
    produces: ["application/json"],
    consumes: ["application/json"],
    paths: {
      ...PackageDocs,
    },
  },
};
