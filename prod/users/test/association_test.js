const mongoose = require("mongoose");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");
const Comment = require("../src/comment");
const assert = require("assert");

describe("Associations", () => {
  let joe, blogPost, comment;
  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
        title: "Js is great",
        content: "Yep it really is",
    });
    comment = new Comment({ content: "Congrats on great posts" });

    //associate blogpost to joe
    joe.blogPosts.push(blogPost);
    //associate comment to blogpost
    blogPost.comments.push(comment);
    //associate user to comment
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() => {
      done();
    });
  });

  it("saves a relation between a user and a blogpost", (done) => {
    User.findOne({ name: "Joe" })
        .populate("blogPosts")
        .then((user) => {
        assert(user.blogPosts[0].title === "Js is great");
        done();
        });
  });

  it("saves a full relation graph", (done) => {
    User.findOne({ name: "Joe" })
        .populate({
        path: "blogPosts",
        populate: {
            path: "comments",
            model: "comment",
            populate: { path: "user", model: "user" },
        },
        })
      .then((user) => {
        assert(user.name === "Joe");
        assert(user.blogPosts[0].title === "Js is great");
        assert(
          user.blogPosts[0].comments[0].content === "Congrats on great posts"
        );
        assert(user.blogPosts[0].comments[0].user.name === "Joe");
        done();
      });
  });
});
