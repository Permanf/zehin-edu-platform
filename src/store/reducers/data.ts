import {
    GET_QUESTIONS_DATA
} from "../actions/data";

const initialState = {
    question:[],
};

const reducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_QUESTIONS_DATA:
            return {
                ...state,
                question: action.payload
            };
        default:
            return state;
    }
}
    
export default reducer;