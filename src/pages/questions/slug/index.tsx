import { Button} from "@mantine/core";
import { AnswerInput, AnswerMultiple, AnswerSingle, Stepper } from "../../../entities";
import { IconAlarm, IconChevronLeft, IconXboxX } from '@tabler/icons-react';
import { useEffect, useReducer, useState } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExam, getQuestionStatus } from "../../../store/selectors/data";
import { modals } from "@mantine/modals";
import { setExamId, setQuestionStatus } from "../../../store/actions/data";
import { useGetQuestionById } from "../../../hooks/questions/useGetQuestionById";
import { useExamResult } from "../../../hooks/exam/useExamResult";

function reducer(state:any, action:any) {
    switch (action.type) {
      case "SET_LOADING":
        return {
          ...state,
          loading: action.payload,
        };
      case "SET_MODAL":
        return {
          ...state,
          modal: action.payload,
        };
      case "SET_DATA":
        return {
          ...state,
          data: action.payload,
        };
      case "ADD_ANSWER": {
        return {
          ...state,
          answer: state.answer.concat(action.payload),
        };
      }
      case "UPDATE_ANSWER_SINGLE": {
        return {
          ...state,
          answer: state.answer.map((item:any, index:number) => {
            if (item?.questionBankID == action.payload.questionId) {
              return (state.answer[index] = action.payload.answer);
            } else {
              return item;
            }
          }),
        };
      }
      // case "ADD_ANSWER_MULTIPLE": {
      //   return {
      //     ...state,
      //     answer_multiple: state.answer_multiple.concat(action.payload),
      //   };
      // }
      // case "UPDATE_ANSWER_MULTIPLE": {
      //   return {
      //     ...state,
      //     answer: state.answer.map((item:any, index:number) => {
      //       if (index == action.payload.step - 1 ) {
      //         return (state.answer[index] = action.payload.answer);
      //       } else {
      //         return item;
      //       }
      //     }),
      //   };
      // }
      case "UPDATE_ANSWER_MULTIPLE": {
        return {
          ...state,
          answer: state.answer.filter((item:any) => item.optionID !== action.payload),
        };
      }
      default:
        return state;
    }
  }

const SlugQuestion = () => {
    const [state, setState] = useReducer(reducer, {
        loading: false,
        modal: false,
        answer: [],
        // answer_multiple: [],
        delete_id: null,
      });
    const exam = useSelector(getExam);
    const addMutationExam = useExamResult();
    const initialTime = exam?.duration * 60; // 15 minutes in seconds
    const [timeLeft, setTimeLeft] = useState<any>(initialTime);
    // const [question, setQuestion] = useState<any>(null);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const questionStatus = useSelector(getQuestionStatus);
    const {data: examQuestions} = useGetQuestionById({id: exam?.onlineExamID })
    if (questionStatus == '') {
        navigate(`/tests`)
    }
    // const questions = [
    //     {id:1, question:"question1", 
    //     answer: [
    //         {id:1, answer:"answer1"}, 
    //         {id:2, answer:"answer2"},
    //         {id:3, answer:"answer3"},
    //         {id:4, answer:"answer4"},
    //     ]},
    //     {id:2, question:"question2", 
    //     answer: [
    //         {id:1, answer:"answer21"}, 
    //         {id:2, answer:"answer22"},
    //         {id:3, answer:"answer23"},
    //         {id:4, answer:"answer24"},
    //     ]},
    //     {id:3, question:"question3", 
    //     answer: [
    //         {id:1, answer:"answer31"}, 
    //         {id:2, answer:"answer32"},
    //         {id:3, answer:"answer33"},
    //         {id:4, answer:"answer34"},
    //     ]},
    //     {id:4, question:"question4", 
    //     answer: [
    //         {id:1, answer:"answer1"}, 
    //         {id:2, answer:"answer2"},
    //         {id:3, answer:"answer3"},
    //         {id:4, answer:"answer4"},
    //     ]},
    //     {id:5, question:"question5", 
    //     answer: [
    //         {id:1, answer:"answer1"}, 
    //         {id:2, answer:"answer2"},
    //         {id:3, answer:"answer3"},
    //         {id:4, answer:"answer4"},
    //     ]},
    // ]
    useEffect(() => {
        const timer = setInterval(() => {
        setTimeLeft((prevTime:any) => prevTime - 1);
        }, 1000);
        // Cleanup function to clear the interval when component unmounts
        return () => clearInterval(timer);
    }, []);

    const formatTime = (time:any) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        // console.log(minutes,"--", seconds)
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const openModal = () => modals.openConfirmModal({
        // title: 'Please confirm your action',
        size: 'sm',
        radius: 'md',
        centered: true,
        children: (
            <span className="flex justify-center font-bold text-xl text-center">
            Вы уверены что хотите <br /> завершить тест?
            </span>
        ),
        labels: { confirm: 'Да', cancel: 'Нет' },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => {
            // console.log('Confirmed');
            dispatch(setQuestionStatus(""));
            navigate(`/tests`);
        },
    });

    const handleResult = () =>{
        // console.log(state.answer?.length, "---", examQuestions?.questions?.length);
        // console.log(state.answer,"--nusga");
        setState({ type: "SET_LOADING", payload: true });
        addMutationExam.mutate({answer: JSON.stringify(state.answer)});
        // if (state.answer?.length != examQuestions?.questions?.length){
        //     notifications.show({
        //         color: "red",
        //         title: 'Üstünlikli bolmady!',
        //         message: `Jogaby saýlanman galan sorag bar`,
        //       })
        // } else {
        //     console.log(state.answer,"---r")
        //     setState({ type: "SET_LOADING", payload: true });
        //     addMutationExam.mutate({answer: JSON.stringify(state.answer)});
        // }
    }
    useEffect(() => {
        // console.log(addMutationExam,"--result");
        if (addMutationExam.isSuccess) {
          setState({ type: "SET_LOADING", payload: false });
          // console.log("successfully");
          dispatch(setExamId(exam?.onlineExamID));
          navigate("/result");
        }
        if (addMutationExam.isError){
          console.log("error")
          setState({ type: "SET_LOADING", payload: false });
        }
      },[addMutationExam.status]);
    
    // console.log(testById)
    useEffect(()=>{
        console.log(examQuestions,"--exam")
        // console.log(examQuestions?.questions[parseInt(params?.id ?? '') - 1])
        // console.log(examQuestions?.options[parseInt(examQuestions?.questions[parseInt(params?.id ?? '') - 1]?.question ?? '')],"-options")
        // console.log(state.answer,"--answer")
        // questions?.forEach((item:any)=>{
        //     if (item.id == params.id){
        //         setQuestion(item)
        //     }
        // })
    },[params.id]);

    
    return(
        <>
        <div className="flex justify-between my-10">
            <div className="bg-white rounded-xl px-4 py-2 font-medium flex items-center">
                <IconAlarm size={22} />
                <span className="ml-1">{formatTime(timeLeft)}</span>
            </div>
            <Button 
                size="md"
                color="red"
                rightSection={<IconXboxX size={19} />}
                className="hover:bg-red-500"
                onClick={openModal}
            >
                Завершить тест
            </Button>
        </div>
        
        <div className="w-full p-5 border rounded-xl shadow-md bg-white">
            <Stepper currentStep={params.id} steps={examQuestions?.questions} />
            <div className="w-full my-10">
                <h1 className="font-bold text-2xl my-5">{examQuestions?.questions[parseInt(params?.id ?? '') - 1]?.question}</h1>
                {
                examQuestions?.questions[parseInt(params?.id ?? '') - 1]?.typeNumber == 1
                ?
                <AnswerSingle
                question={examQuestions?.questions[parseInt(params?.id ?? '') - 1]} 
                options={examQuestions?.options[parseInt(examQuestions?.questions[parseInt(params?.id ?? '') - 1]?.questionBankID ?? '')]} 
                currentStep={params.id}
                state={state}
                setState={setState}
                examID={exam?.onlineExamID}
                />
                :
                examQuestions?.questions[parseInt(params?.id ?? '') - 1]?.typeNumber == 3
                ?
                <AnswerInput 
                question={examQuestions?.questions[parseInt(params?.id ?? '') - 1]} 
                examID={exam?.onlineExamID}
                currentStep={params.id}
                state={state}
                setState={setState}
                />
                :
                <AnswerMultiple 
                question={examQuestions?.questions[parseInt(params?.id ?? '') - 1]} 
                options={examQuestions?.options[parseInt(examQuestions?.questions[parseInt(params?.id ?? '') - 1]?.questionBankID ?? '')]} 
                currentStep={params.id}
                state={state}
                setState={setState}
                examID={exam?.onlineExamID}
                />
                }
            </div>
            <div className="w-full flex justify-center mt-5">
                {
                    params?.id
                    ?
                    <>
                    {params?.id != "1"
                    ?
                    <Link to={`/questions/${parseInt(params?.id) - 1}`}>
                        <div className="w-48 mr-5">
                            <Button 
                                leftSection={<IconChevronLeft color="black" />} 
                                fullWidth 
                                size="md" 
                                color="gray.1"
                                styles={{ label: { color: 'black' }}}
                                >
                                Предыдущий
                            </Button>
                        </div>
                    </Link>
                    : null
                    }
                    <div className="w-48">
                        {
                            params?.id == examQuestions?.questions?.length
                            ?
                            <Button loading={state.loading} fullWidth size="md" onClick={handleResult}>Результат</Button>
                            :
                            <Link to={`/questions/${parseInt(params?.id) + 1}`}>
                                <Button fullWidth size="md" >Далее</Button>
                            </Link>
                        }
                    </div>
                    </>

                    :
                    null
                }
            </div>
        </div>
        </>
    )
}
export default SlugQuestion;