import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
});

export const getAllPosts = () => Axios.get('/posts?userId=1');
export const createPost = (body) => Axios.post('/posts', body);
export const editPost = (postId, body) => Axios.patch(`/posts/${postId}`, body);
export const deletePost = (postId) => Axios.delete(`/posts/${postId}`);

export const getPostComments = (postId) => Axios.get(`/posts/${postId}/comments`);
export const createComment = (postId, body) => Axios.post(`/posts/${postId}/comments`, body);
export const editComment = (commentId, body) => Axios.patch(`/comments/${commentId}`, body);
export const deleteComment = (commentId) => Axios.delete(`/comments/${commentId}`);
