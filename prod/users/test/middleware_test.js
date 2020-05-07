const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

describe("Middleware", () => {
  let joe, blogPost, comment;
  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "Js is great",
      content: "Yep it really is",
    });

    //associate blogpost to joe
    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()]).then(() => {
      done();
    });
  });

  it.only("users clean up dangling blogposts & comments on remove", (done) => {
    joe
      .remove()
      .then(() => {
        return BlogPost.count();
      })
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
