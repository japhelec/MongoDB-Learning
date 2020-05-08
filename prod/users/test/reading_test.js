const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  let joe, maria, alex, zach;
  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    alex = new User({ name: "Alex" });
    maria = new User({ name: "Maria" });
    zach = new User({ name: "Zach" });
    Promise.all([joe.save(), alex.save(), maria.save(), zach.save()]).then(
      () => {
        done();
      }
    );
  });

  it("Finds all users with a name of Joe", (done) => {
    User.find({ name: "Joe" }).then((users) => {
      assert(joe._id.toString() === users[0]._id.toString());
      done();
    });
  });

  it("Find a user with a particular id", (done) => {
    User.findOne({ _id: joe._id }).then((user) => {
      assert(user.name === "Joe");
      done();
    });
  });

  it.only("can skip and limit the result set", (done) => {
    User.find({})
      .sort({ name: "ascending" })
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === "Joe");
        assert(users[1].name === "Maria");
        done();
      });
  });
});
