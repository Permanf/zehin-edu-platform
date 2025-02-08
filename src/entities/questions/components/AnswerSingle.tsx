import { CheckIcon, Grid, Radio } from "@mantine/core"
import { IAnswer, IAnswerProps, IOption } from "../../../types/questions.interface";

export function AnswerSingle({question, options, currentStep, state, setState, examID}:IAnswerProps){
    const handleAnswerSelect = (answer:IAnswer) => {
        const isAnswer = {"questionBankID": question.questionBankID, "examID": examID, "typeNumber": question?.typeNumber, "optionID": answer?.optionID, "optionText": answer?.name}
    if (currentStep){
        const haveQuestionId = state.answer.some((element:{questionBankID: string}) => element.questionBankID == question.questionBankID)
        if (haveQuestionId){
            setState({ type: "UPDATE_ANSWER_SINGLE", payload: { questionId: question.questionBankID, answer: isAnswer}});
        } else {
            setState({ type: "ADD_ANSWER", payload: isAnswer });
        }
    }
    };
    return(
        <>
        <Grid className="my-4" gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
            {options?.map((item:IOption)=>{
                return(
                <Grid.Col 
                    span={{
                    base: 6,
                    xs: 12,
                    sm: 12, 
                    md: 6,
                    lg: 6 
                    }}>
                    <div  className={`flex items-center w-full`}>
                        <Radio 
                            icon={CheckIcon} 
                            name="check" 
                            checked={state.answer.some((element: {optionID: number}) => element.optionID == item.optionID)}
                            onChange={() => handleAnswerSelect(item)}
                            className="cursor-pointer" 
                            />
                        <div 
                        className={`${state.answer.some((element: {optionID: number}) => element.optionID == item.optionID) ? "border-primaryBlue-200 border" : "border-none"} rounded-xl bg-gray-100 w-full ml-3 p-4 cursor-pointer flex flex-col justify-center items-center font-medium`}
                        onClick={() => handleAnswerSelect(item)}
                        >
                            {
                                item?.image
                                ?
                                <img src={item?.image} alt="image" className="w-1/2 rounded-xl mb-3" />
                                :
                                null
                            }
                            <span>{item?.name}</span>
                        </div>
                    </div>
                </Grid.Col>
                )
            })}
        </Grid>
        </>
    )
}
