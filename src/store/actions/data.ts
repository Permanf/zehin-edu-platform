export const GET_QUESTIONS_DATA = 'GET_QUESTIONS_DATA';
export const setQuestionsData = (data:any) => ({
    type: GET_QUESTIONS_DATA,
    payload: data
});