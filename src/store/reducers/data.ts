import {
    GET_EXAM_DATA,
    GET_EXAM_ID,
    SET_QUESTION_STATUS,
} from "../actions/data";

const initialState = {
    status: "",
    exam:[],
    exam_id: null,
};

const reducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_EXAM_DATA:
            return {
                ...state,
                exam: action.payload
            };
        case GET_EXAM_ID:
            return {
                ...state,
                exam_id: action.payload
            };
        case SET_QUESTION_STATUS:
            return {
                ...state,
                status: action.payload
            };
        default:
            return state;
    }
}
    
export default reducer;