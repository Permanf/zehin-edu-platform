export const GET_EXAM_DATA = 'GET_EXAM_DATA';
export const setExamData = (data:any) => ({
    type: GET_EXAM_DATA,
    payload: data
});

export const GET_EXAM_ID = 'GET_EXAM_ID';
export const setExamId = (data:any) => ({
    type: GET_EXAM_ID,
    payload: data
});

export const SET_QUESTION_STATUS = 'SET_QUESTION_STATUS';
export const setQuestionStatus = (data:any) => ({
    type: SET_QUESTION_STATUS,
    payload: data
});