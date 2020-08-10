import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../Shared/baseUrl';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const fectDishes = () => (dispatch) =>{
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes))); 

}

export const addDishes = (dishes) =>({
    type: ActionTypes.ADD_DISHES,
    payload:dishes
})

export const dishesFailed = (errMess) =>({
    type: ActionTypes.DISHES_FAILED,
    payload:errMess
})

export const dishesLoading = () =>({
    type: ActionTypes.DISHES_LOADING
});

export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});