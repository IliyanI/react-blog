/* eslint-disable default-case */
function postReducer(
  state = {
    allPosts: [],
    selectedPost: {},
    userPosts: [],
    postsCount: 0,
    postData: undefined,
    create: undefined,
    edit: undefined
  },
  action
) {
  switch (action.type) {
    case "GET_POSTS_FULFILLED":
      state = {
        ...state,
        allPosts: action.payload,
        postsCount: action.payload.length
      };
      break;
    case "GET_USER_POSTS_FULFILLED":
      state = {
        ...state,
        userPosts: action.payload.posts
      };
      break;
    case "CREATE_POST_FULFILLED":
      state = {
        ...state,
        create: action.payload
      };
      break;
    case "EDIT_POST_FULFILLED":
      state = {
        ...state,
        edit: action.payload
      };
      break;
    case "GET_POST_FULFILLED":
      state = {
        ...state,
        postData: action.payload
      };
      break;
    case "DELETE_POST_FULFILLED":
      state = {
        ...state,
        postDelete: action.payload
      };
      break;
    case "LIKE_POST_FULFILLED":
      state = {
        ...state,
        postData: {
          ...state.postData,
          likes: action.payload.likes
        }
      };
      break;
    case "SET_SELECTED_POST":
      state = {
        ...state,
        selectedPost: action.payload
      };
      break;
    case "SORT_POSTS_DATE":
      state = {
        ...state,
        allPosts: state.allPosts.sort(
          (a, b) =>
            new Date(b.dateCreated).getTime() -
            new Date(a.dateCreated).getTime()
        )
      };
      break;
    case "SORT_POSTS_LIKES":
      state = {
        ...state,
        allPosts: state.allPosts.sort((a, b) => b.likes - a.likes)
      };
      break;
    case "SET_POST_CONTENT":
      state = {
        ...state,
        postData: {
          ...state.postData,
          content: action.payload
        }
      };
      break;
    case "FLUSH_POST_DATA":
      state = {
        ...state,
        postData: undefined
      };
  }
  return state;
}

export default postReducer;
