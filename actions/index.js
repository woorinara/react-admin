import request from 'axios';

export const USER_AUTH = 'USER_AUTH';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_AUTH_FAIL = 'USER_AUTH_FAIL';
export const USER_IS_AUTHENTICATED = 'USER_IS_AUTHENTICATED';
export const USER_ME_UPDATE = 'USER_ME_UPDATE';

export const RECEIVE_ME = 'RECEIVE_ME';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const RECEIVE_DATA = 'RECEIVE_DATA';
export const DELETE_DATA = 'DELETE_DATA';
export const SENT_DATA = 'SENT_DATA';
export const SENT_MESSAGE = 'SENT_MESSAGE';

import * as firebase from "firebase";
import Database from "../components/firebase/database";

const API_URL = 'http://localhost:5000';


export function signup(email, pass) {
	const params = {
    email:email,
    password:pass
	}

	return {
		type : USER_SIGNUP,
		promise: firebase.auth().createUserWithEmailAndPassword(params.email, params.password)
	}
}

export function putMe(me, token) {
	return {
		type : USER_ME_UPDATE,
		promise: request.post(API_URL + '/api/users/me', me,
		{
			headers: {
				'x-access-token': token
			}
		})
	}
}

export function auth(email, pass) {
	const params = {
    email:email,
    password:pass
	}

  return {
		type : USER_AUTH,
		promise: firebase.auth().signInWithEmailAndPassword(params.email, params.password)
    // promise: firebase.auth().createUserWithEmailAndPassword(params.email, params.password)
	}
}

export function logout() {
	return {
		type : USER_LOGOUT
	}
}

export function isAuthenticated() {
	return {
		type : USER_IS_AUTHENTICATED
	}
}

export function fetchUsers(token) {
	return {
		type: RECEIVE_USERS,
		promise: request.get(API_URL + '/api/users/',{
			headers: {
				'x-access-token': token
			}
		})
	}
}

export function fetchMe(token) {
	return {
		type: RECEIVE_ME,
		promise: request.get(API_URL + '/api/users/me/', {
			headers: {
				'x-access-token': token
			}
		})
	}
}

export function sendMessage(message) {
  return {
    type: SENT_MESSAGE,
    promise: Database.sendMessage(message)
  }
}
