import remote from "../../helpers/remote";
import serverEndpoints from "../../helpers/serverEndpoints";
const {
  ALL_POSTS_ENDPOINT,
  USER_POSTS_ENDPOINT,
  POST_GET,
  POST_DELETE,
  POST_LIKE,
  POST_CREATE,
  POST_EDIT,
  COMMENT_CREATE
} = serverEndpoints;

export default dispatch => {
  return {
    getPosts: () => {
      dispatch({
        type: "GET_POSTS",
        payload: new Promise((res, rej) => {
          remote
            .get(ALL_POSTS_ENDPOINT)
            .then(data => data.json())
            .then(posts => res(posts))
            .catch(err => rej(err));
        })
      });
    },
    createPost: post => {
      dispatch({
        type: "CREATE_POST",
        payload: new Promise((res, rej) => {
          remote
            .post(POST_CREATE, post)
            .then(data => data.json())
            .then(data => res(data))
            .catch(err => {
              console.log(err);
            });
        })
      });
    },
    editPost: post => {
      dispatch({
        type: "EDIT_POST",
        payload: new Promise((res, rej) => {
          remote
            .post(POST_EDIT, post)
            .then(data => data.json())
            .then(data => res(data))
            .catch(err => {
              console.log(err);
            });
        })
      });
    },
    getPost: id => {
      dispatch({
        type: "GET_POST",
        payload: new Promise((res, rej) => {
          remote
            .get(POST_GET + id)
            .then(data => data.json())
            .then(data => {
              console.log(data);
              res({
                ...data,
                content: decodeURI(data.content)
              });
            });
        })
      });
    },
    deletePost: id => {
      dispatch({
        type: "DELETE_POST",
        payload: new Promise((res, rej) => {
          remote
            .delete(POST_DELETE + id)
            .then(data => data.json())
            .then(data => {
              res({ ...data });
            });
        })
      });
    },
    likePost: id => {
      dispatch({
        type: "LIKE_POST",
        payload: new Promise((res, rej) => {
          remote
            .post(POST_LIKE + id)
            .then(data => data.json())
            .then(data => {
              res({
                likes: data.likes
              });
            });
        })
      });
    },
    getUserPosts: id => {
      dispatch({
        type: "GET_USER_POSTS",
        payload: new Promise((res, rej) => {
          remote
            .post(USER_POSTS_ENDPOINT, { id })
            .then(data => data.json())
            .then(data => res(data))
            .catch(err => rej(err));
        })
      });
    },
    sortPostsByDate: () => {
      dispatch({
        type: "SORT_POSTS_DATE"
      });
    },
    sortPostsByLikes: () => {
      dispatch({
        type: "SORT_POSTS_LIKES"
      });
    },
    setPostContent: content => {
      dispatch({
        type: "SET_POST_CONTENT",
        payload: content
      });
    },
    flushPostData: () => {
      dispatch({
        type: "FLUSH_POST_DATA"
      });
    },
    createComment: comment => {
      dispatch({
        type: "CREATE_COMMENT",
        payload: new Promise((res, rej) => {
          remote
            .post(COMMENT_CREATE, comment)
            .then(data => data.json())
            .then(data => res(data))
            .catch(err => console.log(err));
        })
      });
    }
  };
};
