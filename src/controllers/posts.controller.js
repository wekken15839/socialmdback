import Post from "../models/post.model.js";
import mongoose from "mongoose";

export const post = async (req, res) => {

  const { description, image } = req.body;
  const { user } = req;
  try {

    if (!description && !image) return res.status(400).json({ message: "description or image are required" })

    const newPost = new Post({ description, image, user })
    await newPost.save();

    const populatedPost = await Post.findById(newPost._id).populate(
      {
        path: "user",
        select: "-password"
      }
    );

    res.status(200).json(populatedPost);

  } catch (error) {
    res.status(500).json(error.message);
  }

}

function randomizeArray(array) {
  return array.slice().sort(function () {
    return 0.5 - Math.random();
  });
}


export const getPosts = async (req, res) => {

  try {

    const { page } = req.query;
    const skip = (page - 1) * 10;
    const result = await Post.find().populate({ path: "user", select: "-password" }).populate({ path: "user", select: "-password" }).populate({ path: "comments.user", select: "-password" }).populate({ path: "likes.user", select: "-password" }).skip(skip).limit(10);

    res.send(randomizeArray(result));
  } catch (error) {
    res.status(500).json(error);
  }

}

export const getMyPosts = async (req, res) => {

  const { user } = req;

  try {
    const result = await Post.find({ user }).populate({ path: "user", select: "-password" }).populate({ path: "comments.user", select: "-password" }).sort({ createdAt: -1 });

    return res.status(200).json(result);

  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }

}

export const likePost = async (req, res) => {

  try {
    const { postId } = req.params;
    const { user } = req;
    const post = await Post.findById(postId).populate({ path: "user", select: "-password" }).populate({ path: "comments.user", select: "-password" }).populate({ path: "likes.user", select: "-password" });

    if (!post) return res.status(200).json({ message: "post not found" });

    let isLiked = false;

    let userIndex = -1;

    post.likes.forEach((like, index) => {
      if (like.user._id.toJSON() === user) {
        isLiked = true;
        userIndex = index;
        return;
      }
    });

    !isLiked ? post.likes.push({ user, date: new Date() }) : post.likes.splice(userIndex, 1);



    const savedPost = await post.save();

    res.status(200).json(savedPost);


  } catch (error) {
    return res.status(500).json(error.message);
  }

}


export const getLikes = async (req, res) => {

  const { id } = req.params;

  try {
    const result = await Post.findById(id).populate({ path: "likes.user", select: "-password" })
    res.status(200).json(result.likes);

  } catch (error) {
    res.status(500).json(error.message);
    console.log(error)
  }

}

export const commentPost = async (req, res) => {

  try {
    const { id } = req.params;
    const { user } = req;
    const { comment } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(id, { $push: { comments: { user, comment } } }, { new: true }).populate({ path: "user", select: "-password" }).populate({ path: "comments.user", select: "-password" });

    res.status(200).json(updatedPost);

  } catch (error) {
    res.status(500).json(error);
  }

}