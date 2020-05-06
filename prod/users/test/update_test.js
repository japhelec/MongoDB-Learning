const assert = require("assert");
const User = require("../src/user");

describe("Updating recors", () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then((user) => done());
  });

  it("instance type using set and save", (done) => {
    joe.set({ name: "Alex" });
    joe
      .save()
      .then(() => User.find())
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });

  it("a model instance can update", (done) => {
    joe
      .update({ name: "Alex" })
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });

  it("A model class can update", (done) => {
    User.updateMany({ name: "Joe" }, { name: "Alex" })
      .then(() => {
        return User.find({});
      })
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });

  it("A model class can update one record", (done) => {
    User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" })
      .then(() => {
        return User.find({});
      })
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });

  it("A model class can find a user by ID and update", (done) => {
    User.findByIdAndUpdate(joe._id, { name: "Alex" })
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });
});
