import * as ActionTypes from './ActionTypes';
import { DISHES } from '../Shared/dishes';

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

    setTimeout(() => {
        dispatch(addDishes(DISHES))
    }, 2000);

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