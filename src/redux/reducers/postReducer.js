/* eslint-disable default-case */
function postReducer(
  state = { allPosts: [], selectedPost: {}, userPosts: [], postsCount: 0 },
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
  }
  return state;
}

export default postReducer;
