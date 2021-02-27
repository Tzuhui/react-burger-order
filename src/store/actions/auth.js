import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + process.env.REACT_APP_IDENTITY_TOKEN;
    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + process.env.REACT_APP_IDENTITY_TOKEN;
    }
    axios.post(url, authData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};

/**
 * {
 * email: "a2@gmail.com"
  expiresIn: "3600"
  idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlYmMyZmI5N2QyNWE1MmQ5MjJhOGRkNTRiZmQ4MzhhOTk4MjE2MmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdHp1aHVpLTEwYzFlIiwiYXVkIjoidHp1aHVpLTEwYzFlIiwiYXV0aF90aW1lIjoxNjE0MjY5MTI1LCJ1c2VyX2lkIjoiT3VzaHBhckdtTk5qN0FkMFU3eVE5U1J2OEhwMiIsInN1YiI6Ik91c2hwYXJHbU5OajdBZDBVN3lROVNSdjhIcDIiLCJpYXQiOjE2MTQyNjkxMjUsImV4cCI6MTYxNDI3MjcyNSwiZW1haWwiOiJhMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiYTJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ecolkkrt-qnLWfBRJBLPKa7A4t1VBOfSJevcWFCNXT-79oYpkdd3rGXujznuk_p5OCp0nsFnucA1yRiajHkL_APFlqy2lXCqyfndPiBOIp797dP1-WhjhvTr6MRSBcDNmoUKUg8IWkxg-Bd00VuMF7zCiSehkx7BNFDm1WPwdLpkw6ud1F__MOo8wIZttjjEAbwyGv2lToEBVRfv_QwrtjWKeg1fLdEaoF-w92XRkQmxIzLY0e1scUFNtESn-PAVkh2zTIpUREAJJIErgF20ecWA_DWVFQREdTBSdjYD021_xb91dEpZdIxNDsSB16uQe5emCbeU5M9vLwdapU9y_w"
  kind: "identitytoolkit#SignupNewUserResponse"
  localId: "OushparGmNNj7Ad0U7yQ9SRv8Hp2"
  refreshToken: "AOvuKvTYbYDOJYG5J1jcqDy5Fx2fh88v6Fo3cU8wXHGpTtsvQ4Z6_R--BI9GLdqkFuOXIVWrnlTowWSeSruYPbbjRnCoetqOZI7Tl4IADQsMtehdHIo6iqspj-q863RKi1e355SpzHu-onP57hy4UMrIBUcbVbDET0P_oWuGq_D6uB2tDLikqZGBgI6flSz-syzF4FPTlj9l"
 * }
 */