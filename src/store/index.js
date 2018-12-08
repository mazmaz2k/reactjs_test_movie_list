import {createStore, combineReducers} from 'redux';

const initialMoviesState ={
    movies: [],
    modal : false,
    sub_modal:false,
    idx: 1
 }


const moviesReducer = (state=initialMoviesState, action)=>{ 
    switch (action.type){
        case "CHANGE_INDEX" : 
            return {
                ...state,
                idx: action.payload  
            };
        case "CHANGE_MOVIE_LIST" : 
            return {
                ...state,
                movies: action.payload  
            };
        default : 
            return state ;
    
    }
}



export const store =createStore(combineReducers({ 
    moviesReducer 
}))


