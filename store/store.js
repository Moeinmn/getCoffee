import { createStore } from 'redux';
import {SET_STORES_DATA , DELETE_STORES_DATA} from './actionsFile'



let reducer = (state= false, action) => {
    switch (action.type) {
        case SET_STORES_DATA:
            return {...state , csrStores : action.payload}
        case DELETE_STORES_DATA:
            let data = delete state.csrStores;
            return {...data}
        default:
            return state
    }
}



let store;
export  default store = createStore(reducer)


