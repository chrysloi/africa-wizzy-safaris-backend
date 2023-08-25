export const PackageDocs = {
  "/package": {
    post: {
      tags: ["Packages"],
      description: "Create package",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  example: "Gorilla Trekking Tour in Volcanoes NP",
                },
                coverImage: {
                  type: "string",
                  example:
                    "https://whc.unesco.org/uploads/thumbs/news_2125-1200-630-20200624150953.jpg",
                },
                details: {
                  type: "string",
                  example:
                    "Gorilla trekking Rwanda tips: • Bring water along on your gorilla trekking Rwanda, eating, drinking and smoking near the gorillas is forbidden – designated time and place will be communicated by your ranger guide. • Photography is permitted, although you must not use flash. • Porters are available to help you carry your day pack for a small charge. • Mountain gorillas live at high altitude and this may cause difficulties for some visitors. You should pace yourself, walk slowly and drink plenty of water.",
                },
                departureTime: {
                  type: "string",
                  example: "8:45 Am",
                },
                returnTime: {
                  type: "string",
                  example: "05:00 pm",
                },
                travelMode: {
                  type: "string",
                  example: "Bus",
                },
                cost: {
                  type: "string",
                  example: "$1500",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Successfully created package",
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
    get: {
      tags: ["Packages"],
      description: "Add activities to package",
      parameters: [],
      requestBody: {},
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
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/package/{id}": {
    post: {
      tags: ["Packages"],
      description: "Add activities to package",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            id: {
              type: "string",
              example: "64e7292735e641d703478689",
            },
          },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                day: {
                  type: "string",
                  example: "Day 1",
                },
                details: {
                  type: "string",
                  example:
                    "Gorilla trekking Rwanda tips: • Bring water along on your gorilla trekking Rwanda, eating, drinking and smoking near the gorillas is forbidden – designated time and place will be communicated by your ranger guide. • Photography is permitted, although you must not use flash. • Porters are available to help you carry your day pack for a small charge. • Mountain gorillas live at high altitude and this may cause difficulties for some visitors. You should pace yourself, walk slowly and drink plenty of water.",
                },
                startTime: {
                  type: "string",
                  example: "8:45 Am",
                },
                endTime: {
                  type: "string",
                  example: "05:00 pm",
                },
                included: {
                  type: "array",
                  example: [
                    {
                      title: "Accomodation",
                      details: "String",
                    },
                    {
                      title: "Proffesional guide",
                      details: "String",
                    },
                  ],
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Activity added successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Successfully added",
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
