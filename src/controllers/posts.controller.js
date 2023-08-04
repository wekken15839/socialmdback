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

export const getPosts = async (req, res) => {

  try {

    const { page } = req.query;
    const skip = (page - 1) * 10;
    const result = await Post.find().populate({ path: "user", select: "-password" }).populate({ path: "user", select: "-password" }).populate({ path: "comments.user", select: "-password" }).skip(skip).limit(10);
    res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }

}

export const likePost = async (req, res) => {



  try {
    const { postId } = req.params;
    const { user } = req;
    const post = await Post.findById(postId).populate({ path: "user", select: "-password" }).populate({ path: "comments.user", select: "-password" });

    if (!post) return res.status(200).json({ message: "post not found" });

    let isLiked = false;

    let userIndex = -1;

    post.likes.forEach((like, index) => {
      if (like.user.toJSON() === user) {
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

export const commentPost = async (req, res) => {

  try {
    const { id } = req.params;
    const { user } = req;
    const { comment } = req.body;
    console.log(id);

    const updatedPost = await Post.findByIdAndUpdate(id, { $push: { comments: { user, comment } } }, { new: true }).populate({ path: "user", select: "-password" }).populate({ path: "comments.user", select: "-password" });

    res.status(200).json(updatedPost);

  } catch (error) {
    res.status(500).json(error);
  }

}