export const UserDocs = {
  "/user/register": {
    post: {
      tags: ["User"],
      description: "Register user",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "Alyne",
                },
                email: {
                  type: "string",
                  example: "joe@doe.com",
                },
                password: {
                  type: "string",
                  example: "Strongpass",
                },
                role: {
                  type: "string",
                  example: "user",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Created successful",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/user/login": {
    post: {
      tags: ["User"],
      description: "Login user",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example: "joe@doe.com",
                },
                password: {
                  type: "string",
                  example: "Strongpass",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Success",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Login successful",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
