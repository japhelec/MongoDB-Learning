const mongoose = require("mongoose");

//告知 mocha 在執行測試前先跑這一段
before((done) => {
  //連接到地方上的 database，並開起新的計劃 database 叫作 user_test
  mongoose.connect("mongodb://localhost/users_test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  //檢查mongoose 連線
  //mongoose.connection 用來取得 mogoose.connect 的物件
  //加上 .once  .on 兩個 event emitter 檢查連線
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", (error) => {
      console.warn("Warning", error);
    });
});

//Provided by Mocha, tell Mocha execute below code before any testing
beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    //Ready to run the test
    done();
  });
});
