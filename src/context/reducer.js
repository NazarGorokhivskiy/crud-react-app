import {
  INIT_POSTS,
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
  GET_COMMENTS,
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from './actions';

const postsReducer = (state, action) => {
  switch (action.type) {
    case INIT_POSTS: {
      return {
        ...state,
        posts: [...action.payload]
      };
    }
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case EDIT_POST:
      const updatedPost = action.payload;

      const updatedPosts = state.posts.map(post => {
        if (post.id === updatedPost.id) {
          return updatedPost;
        }
        return post;
      });

      return {
        ...state,
        posts: updatedPosts
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    default: return state;
  }
};

const commentsReducer = (state, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: [...action.payload]
      };
    case CREATE_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments]
      };
    case EDIT_COMMENT:
      const updatedComment = action.payload;

      const updatedComments = state.comments.map(post => {
        if (post.id === updatedComment.id) {
          return updatedComment;
        }
        return post;
      });

      return {
        ...state,
        comments: updatedComments
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload)
      };
    default: return state;
  }
};

const combineReducers = (state, action) => {
  const reducers = [postsReducer, commentsReducer];

  return reducers.reduce((st, fn) => fn(st, action), state);
};

export default combineReducers;
