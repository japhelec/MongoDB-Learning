const mongoose = require("mongoose");

//連接到地方上的 database，並開起新的計劃 database 叫作 user_test
mongoose.connect("mongodb://localhost/users_test");
//檢查mongoose 連線
mongoose.connection
  // event emitter
  .once("open", () => {
    console.log("Good to go!");
  })
  // event emitter
  .on("error", (error) => {
    console.warn("Warning", error);
  });
