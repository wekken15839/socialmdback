import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { commentPostSchema, createPostSchema } from "../schemas/posts.schema.js";
import { validateImage } from "../middlewares/validateImage.js";
import { commentPost, getPosts, likePost, post } from "../controllers/posts.controller.js";
import { multerUpload } from "../middlewares/multer.js";

const router = Router();

router.post("/post", validateToken, multerUpload.single('image'), validateImage, validateSchema(createPostSchema), post);
router.get('/posts', validateToken, getPosts);
router.post('/posts/like/:postId', validateToken, likePost);
router.post('/posts/comment/:id', validateToken, validateSchema(commentPostSchema), commentPost);

export default router;