import express from 'express';
import { getPosts, createPost } from '../controllers/posts.js';

const router = express.Router()

// GET posts
router.get("/", getPosts);

// POST posts
router.post("/", createPost);

export default router;