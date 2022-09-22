const getIsLoggedIn = state => state.auth.isLoggedIn;

const getEmail = state => state.auth.user.email;
const getName = state => state.auth.user.name;
const getIsFetchingCurrentUser = state => state.auth.isFetchingCurrentUser;
const getUserPicture = state => state.auth.user.picture;
const getCategories = state => state.auth.categories;
const getBalance = state => state.auth.balance;
const getToken = state => state.auth.token;
const authSelectors = {
  getIsLoggedIn,
  getUserPicture,
  getEmail,
  getName,
  getIsFetchingCurrentUser,
  getCategories,
  getBalance,
  getToken,
};
export default authSelectors;
