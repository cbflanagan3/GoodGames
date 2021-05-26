const axios = require("axios");
const TYPES = require("./types");

const getUser = (user) => ({
    type: TYPES.GET_USER,
    user,
  });
  const clearUser = () => ({
    type: TYPES.CLEAR_USER,
  });

  const getGames = (games) => ({
    type: TYPES.GET_GAMES,
    games,
  });

  const setGames = (games) => ({
      type: TYPES.SET_GAMES,
      games,
  })

  const fetchGames = () => {
    return (dispatch) => {
      return axios.get('api/games')
            .then(response => {
                console.log(response)
                return response.data;
            })
            .then((games) => {
                console.log(games)
                return dispatch(getGames(games))
            })
            .catch(err => {
                console.error(err);
            })
    };
  };

  const fetchUser = () => {
    return async (dispatch) => {
      const {user} = (await axios.get(`/api/auth/login`)).data;
      if (user) {
        dispatch(getUser(user));
        return [user];
      }
      return [false];
    };
  };


  const editUser = (name, value) => ({
    type: TYPES.EDIT_USER,
    name,
    value,
  });
  
  module.exports = {
      getUser,
      clearUser,
      getGames,
      fetchGames,
      fetchUser,
      editUser,
  }