// import { ADD_SEARCH } from '../actionTypes';

const initialState = {
    favorites: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // case ADD_SEARCH:
        //     return { ...state, favorites: action.content };

        default:
            return state;
    }
};

export default reducer;
