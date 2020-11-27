import axios from 'axios';

const initialState = {
    user: {},
    showPosts: [{title: "rock'n'roll dilemma", img: "img here", content: "get out to gig yall", band_id: 3}, {title: "miss me with that", img: "another img here", content: "ain't nobody got time for that", band_id: 3}],
    forumPosts: [],
    isLoggedIn: false
}

const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const GET_USER = "GET_USER";
const GET_SHOW_POSTS = "GET_SHOW_POSTS";
const GET_FORUM_POSTS = "GET_FORUM_POSTS";
// const ADD_SHOW = "ADD_SHOW";

export function loginUser (user){
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

export default function reducer(state = initialState, action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, user: action.payload, isLoggedIn: true}
        case LOGOUT_USER:
            return {...state, ...action.payload}
        case GET_SHOW_POSTS:
            return {...state, showPosts: action.payload, isLoggedIn: true}
        case GET_FORUM_POSTS:
            return {...state, forumPosts: action.payload, isLoggedIn: true}
        case GET_USER + "_PENDING":
            return state
        case GET_USER + "_FULFILLED":
            return {...state, user: action.payload, isLoggedIn: true}
        case GET_USER + "_REJECTED":
            return initialState
        default:
            return state
    }
}