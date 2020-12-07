import axios from 'axios';

const initialState = {
    user: {},
    showPosts: [],
    forumPosts: [],
    isLoggedIn: false
}

//next time don't store arrays of constantly updated objects in redux, it's unnecessary and involves 1,000 more steps.

const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const GET_USER = "GET_USER";
const GET_SHOW_POSTS = "GET_SHOW_POSTS";
const GET_FORUM_POSTS = "GET_FORUM_POSTS";
const ADD_SHOW = "ADD_SHOW";
const DELETE_SHOW = "DELETE_SHOW";
const EDIT_USER_INFO = "EDIT_USER_INFO";
const ADD_FORUM_POST = "ADD_FORUM_POST";
const EDIT_FORUM_POST = "EDIT_FORUM_POST";
const DELETE_POST = "DELETE_POST";


export function loginUser (){
    const user = axios.get('/api/bands').then(res => res.data).catch(err => console.log('err on loginUser func back end', err))
    return {
        type: LOGIN_USER,
        payload: user
    }
}

export function logoutUser (){
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}

export function getShows (){
    const shows = axios.get('/api/shows').then(res => res.data).catch(err => console.log('err on getshows func', err))
    return {
        type: GET_SHOW_POSTS,
        payload: shows
    }
}

export function getForums (){
    const forums = axios.get('/api/forums').then(res => res.data).catch(err => console.log('err on getforums func', err))
    return {
        type: GET_FORUM_POSTS,
        payload: forums
    }
}

export function getUser (){
    const user = axios.get('/api/bands').then(res => res.data).catch(err => console.log('err on getUser func why is it here', err))
    return {
        type: GET_USER,
        payload: user
    }
}

export function updateUser (){
    const user = axios.put('/api/bands').then(res => res.data).catch(err => console.log('err on updateUser func, back end', err))
    return {
        type: EDIT_USER_INFO,
        payload: user
    }
}

export function addNewShow (title, img, content, id){
    const newShow = axios.post('/api/shows', {title, img, content, id}).then(res => res.data).catch(err => console.log('err on addShow func, back end', err))
    return {
        type: ADD_SHOW,
        payload: newShow
    }
}

export function deleteShow (id){
    const shows = axios.delete(`/api/shows/${id}`).then(res => res.data).catch(err => console.log('err on deleteshow func, reducer', err))
    return {
        type: DELETE_SHOW,
        payload: shows
    }
}

export function addForum (post){
    return {
        type: ADD_FORUM_POST,
        payload: post
    }
}

export function editPost (posts){
    return {
        type: EDIT_FORUM_POST,
        payload: posts
    }
}

export function deletePost (id){
    const posts = axios.delete(`/api/forums/${id}`).then(res => res.data).catch(err => console.log('err in reducer on deletepost', err))
    return {
        type: DELETE_POST,
        payload: posts
    }
}


export default function reducer(state = initialState, action){
    // console.log(action.type, action.payload)
    switch(action.type){
        case LOGIN_USER:
            return {...state, user: action.payload, isLoggedIn: true}
        case LOGOUT_USER:
            return {...state, ...action.payload}
        case GET_SHOW_POSTS + "_FULFILLED":
            return {...state, showPosts: action.payload, isLoggedIn: true}
        case GET_FORUM_POSTS + "_FULFILLED":
            return {...state, forumPosts: action.payload, isLoggedIn: true}
        case GET_USER + "_PENDING":
            return state
        case GET_USER + "_FULFILLED":
            return {...state, user: action.payload, isLoggedIn: true}
        case GET_USER + "_REJECTED":
            return initialState
        case EDIT_USER_INFO:
            return {...state, user: action.payload, isLoggedIn: true}
        case ADD_SHOW + "_PENDING":
            return state
        case ADD_SHOW + "_FULFILLED":
            return {...state, showPosts: action.payload, isLoggedIn: true}
        case ADD_SHOW + "_REJECTED":
            return initialState
        case DELETE_SHOW:
            return {...state, showPosts: action.payload, isLoggedIn: true}
        case ADD_FORUM_POST:
            return {...state, forumPosts: action.payload, isLoggedIn: true}
        case EDIT_FORUM_POST:
            return {...state, forumPosts: action.payload, isLoggedIn: true}
        case DELETE_POST:
            return {...state, forumPosts: action.payload, isLoggedIn: true}
        default:
            return state
    }
}