import { FETCH_POSTS } from "./postsTypes"



const initialState = {
    posts:[]
}

export const postReducer = (state= initialState, action)=>{
    switch (action.type){
        case FETCH_POSTS: 
        return{ posts: action.payload}
        default:
            return state;
    }
}