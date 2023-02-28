db.createCollection("team", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["name", "position", "points", "rebounds", "assists"],
         properties: {
            name: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            position: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            points: {
               bsonType: "int",
               description: "must be an integer and is required"
            },
            rebounds: {
               bsonType: "int",
               description: "must be an integer and is required"
            },
            assists: {
               bsonType: "int",
               description: "must be an integer and is required"
            }
         }
      }
   }
})
