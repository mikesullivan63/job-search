const app = require("./server");
require("./models/db");

const PORT = process.env.PORT || 4000;

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
