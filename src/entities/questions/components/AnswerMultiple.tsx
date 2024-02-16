import { CheckIcon, Checkbox, Grid} from "@mantine/core"

export function AnswerMultiple({question, options, currentStep, state, setState, examID}:any){
    // console.log(question)
    // console.log(options,"--answer");
    const handleAnswerSelect = (answer:any) => {
        // {"questionBankID":34, "examID ":33, "optionID ":321, "typeNumber ":1, "optionText ": " "},
        // console.log(answer);
        // console.log(state.answer,"--h");
        // console.log(options,"--op");
        const isAnswer = {"questionBankID": question.questionBankID, "examID": examID, "typeNumber": question?.typeNumber, "optionID": answer?.optionID, "optionText": answer?.name}
    if (currentStep){
        const haveOptionId = state.answer.some((element:any) => element.optionID == answer.optionID)
        // console.log(haveOptionId,"--have");
        if (haveOptionId){
            // console.log("update");
            setState({ type: "UPDATE_ANSWER_MULTIPLE", payload: answer.optionID });
        } else {
            // console.log("add");
            setState({ type: "ADD_ANSWER", payload: isAnswer });
        }
    }
    };
    return(
        <>
        <Grid className="my-4" gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
            {options?.map((item:any)=>{
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
                        <Checkbox 
                            icon={CheckIcon} 
                            name="check" 
                            checked={state.answer.some((element:any) => element.optionID == item.optionID)}
                            onChange={() => handleAnswerSelect(item)}
                            className="cursor-pointer" 
                            />
                        <div 
                        className={`${state.answer.some((element:any) => element.optionID == item.optionID) ? "border-primaryBlue-200 border" : "border-none"} 
                        rounded-xl bg-gray-100 w-full ml-3 p-4 cursor-pointer flex flex-col justify-center items-center font-medium`}
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