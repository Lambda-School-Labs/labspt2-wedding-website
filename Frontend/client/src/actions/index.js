import axios from 'axios'
// L_G = LOGIN_REGISTER
export const L_R = 'L_R'
export const L_R_SUCCESS = 'L_R_SUCCESS'
export const L_R_ERROR = 'L_R_ERROR'
export const FETCHING = 'FETCHING'
export const SET_USER = 'SET_USER'
export const OAUTH_USER = 'SET_USER'
export const SOCIAL_USER = 'SOCIAL_USER'
export const GET_USERS = 'GET_USERS'
export const GET_USER = 'GET_USER'
export const GET_GUESTS = 'GET_GUESTS'
export const GET_GUEST = 'GET_GUEST'
export const UPDATING = 'UPDATING'
export const DELETE = 'DELETE'
export const DELETE_SUCCESS = 'DELETE_SUCCESS'
export const ERROR = 'ERROR'
export const LOGOUT = 'LOGOUT'

// needs to be stored on secret .env file for production
const api = 'http://localhost:3700' || 'https://joinourbigday.herokuapp.com'

//Login in / Registering
export const loginRegister = creds => dispatch => {
  dispatch({ type: L_R })
  axios
    .post(`${api}/auth/register-login`, creds)
    .then(res => {
      localStorage.setItem('jwt', res.data.token)
      console.log('login user info:', res.data.userInfo)
      dispatch({
        type: L_R_SUCCESS,
        payload: res.data.userInfo,
      })
    })
    .catch(err => {
      dispatch({
        type: L_R_ERROR,
        payload: err,
      })
    })
}

export const setUser = tokenInfo => dispatch => {
  dispatch({ type: SOCIAL_USER })
  if (tokenInfo.username) {
    // if there is a username in the token it means that they have looged in before and gone through account setup to choose a username + other stuff
    console.log('recurrent user')
    dispatch({
      type: OAUTH_USER,
      payload: tokenInfo,
    })
  } else {
    // if there is no username in the token it means that it is the first time loggin in w oauth they still haven't chosen an username and they can be sent to the acount setup
    console.log('new user')
    dispatch({
      type: SET_USER,
      payload: tokenInfo,
    })
  }
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
  localStorage.removeItem('jwt')
}

//users
export const fetchUsers = () => dispatch => {
  dispatch({ type: FETCHING })
  axios
    .get(`${api}/users`)
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      })
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err,
      })
    })
}

export const fetchUser = id => dispatch => {
  dispatch({ type: FETCHING })
  axios
    .get(`${api}/users/${id}`)
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data,
      })
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err,
      })
    })
}

export const editUser = (id, user) => dispatch => {
  dispatch({ type: UPDATING })
  axios
    .put(`${api}/users/${id}`, user)
    .then(() => fetchUser(id)(dispatch))
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err,
      })
    })
}

export const fetchGuests = () => dispatch => {
  dispatch({ type: FETCHING })
  axios
    .get(`${api}/guest`)
    .then(res => {
      dispatch({
        type: GET_GUESTS,
        paylaod: res.data,
      })
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        paylaod: err,
      })
    })
}
export const fetchGuest = id => dispatch => {
  dispatch({ type: FETCHING })
  axios
    .get(`${api}/guest/${id}`)
    .then(res => {
      dispatch({
        type: GET_GUEST,
        paylaod: res.data,
      })
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        paylaod: err,
      })
    })
}

export const editGuest = (id, guest) => dispatch => {
  dispatch({ type: UPDATING })
  axios
    .put(`${api}/guest/${id}`, guest)
    .then(() => fetchGuest(id)(dispatch))
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err,
      })
    })
}

export const deleteGuest = id => dispatch => {
  dispatch({ type: DELETE })
  axios
    .delete(`${api}/guest/${id}`)
    .then(() => fetchGuests()(dispatch))
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err,
      })
    })
}
