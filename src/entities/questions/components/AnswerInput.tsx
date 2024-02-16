import { Textarea } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";


export function AnswerInput({question, examID, currentStep, state, setState}:any){
    const [value, setValue] = useState('');
    const [debounced] = useDebouncedValue(value, 400);
    useEffect(()=>{
        state.answer.forEach((element:any) => {
            if (element.optionID == 0){
                // console.log(element.optionText,"--")
                setValue(element.optionText);
            }
        });
        
    },[])
    useEffect(()=>{
        const isAnswer = {"questionBankID": question.questionBankID, "examID": examID, "typeNumber": question?.typeNumber, "optionID": 0,  "optionText": debounced}
        if (currentStep && debounced){
        const haveQuestionId = state.answer.some((element:any) => element.questionBankID == question.questionBankID)
            if (haveQuestionId){
                // console.log("update");
                // console.log(isAnswer,"--input")
                setState({ type: "UPDATE_ANSWER_SINGLE", payload: { questionId: question.questionBankID, answer: isAnswer}});
            } else {
                // console.log("add")
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