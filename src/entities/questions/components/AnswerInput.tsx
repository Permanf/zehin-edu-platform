import { Textarea } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { IAnswerProps } from "../../../types/questions.interface";


export function AnswerInput({question, examID, currentStep, state, setState}:IAnswerProps){
    const [value, setValue] = useState('');
    const [debounced] = useDebouncedValue(value, 400);
    useEffect(()=>{
        state.answer.forEach((element:{optionID:number; optionText: string}) => {
            if (element.optionID == 0){
                setValue(element.optionText);
            }
        });
        
    },[])
    useEffect(()=>{
        const isAnswer = {"questionBankID": question.questionBankID, "examID": examID, "typeNumber": question?.typeNumber, "optionID": 0,  "optionText": debounced}
        if (currentStep && debounced){
        const haveQuestionId = state.answer.some((element: {questionBankID: string}) => element.questionBankID == question.questionBankID)
            if (haveQuestionId){
                setState({ type: "UPDATE_ANSWER_SINGLE", payload: { questionId: question.questionBankID, answer: isAnswer}});
            } else {
                setState({ type: "ADD_ANSWER", payload: isAnswer });
            }
        }
    },[debounced])
    return(
        <>
        <Textarea
            placeholder="Ответь..."
            autosize
            minRows={10}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
        />
        </>
    )
}