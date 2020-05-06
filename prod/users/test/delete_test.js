const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then((user) => {
      done();
    });
  });

  it("Model instance remove", (done) => {
    joe
      .remove()
      .then(() => {
        return User.findOne({ name: "Joe" });
      })
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("Class method remove", (done) => {
    User.deleteMany({
      name: "Joe",
    })
      .then(() => {
        return User.findOne({ name: "Joe" });
      })
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("Class method findONeAndRemove", (done) => {
    User.findOneAndRemove({ name: "Joe" })
      .then(() => {
        return User.findOne({ name: "Joe" });
      })
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("Class method findByIdAndRemove", (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => {
        return User.findOne({ name: "Joe" });
      })
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
