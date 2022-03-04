import Axios from 'axios';
import { API_URL } from '../config';


/* selectors */
export const getFoodData = ({ food }) => food;

/* action name creator */
const reducerName = 'food';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_FOOD = createActionName('ADD_FOOD');
const UPDATE_ORDER_FOOD = createActionName('UPDATE_ORDER_FOOD');
const CLEAN_ORDER_FOOD = createActionName('CLEAN_ORDER_FOOD');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addFood = payload => ({ payload, type: ADD_FOOD });
export const updateOrderFood = payload => ({ payload, type: UPDATE_ORDER_FOOD });
export const cleanOrderFood = payload => ({ payload, type: CLEAN_ORDER_FOOD });

/* thunk creators */

export const addFoodInAPI = (food) => {

  const newFood = {...food};

  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .post('http://localhost:8000/api/foods', newFood)
      .then(res => {
        dispatch(addFood(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_FOOD: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };
    }
    case UPDATE_ORDER_FOOD: {
      return {
        ...statePart,
        data: {
          dishName: action.payload.dishName,
          dishType: action.payload.dishType,
        },
      };
    }
    case CLEAN_ORDER_FOOD: {
      return {
        ...statePart,
        food: {},
      };
    }
    default:
      return statePart;
  }
};
