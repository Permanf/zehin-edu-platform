import { Button, Center, Loader} from "@mantine/core";
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
import { notifications } from "@mantine/notifications";
import translations from "../translation";
import { getLang } from "../../../store/selectors/auth";


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
        delete_id: null,
    });
    const exam = useSelector(getExam);
    const lang = useSelector(getLang)
    const addMutationExam = useExamResult();
    const initialTime = exam?.duration * 60; 
    const [timeLeft, setTimeLeft] = useState<any>(initialTime);
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const questionStatus = useSelector(getQuestionStatus);
    const {data: examQuestions, isLoading} = useGetQuestionById({id: exam?.onlineExamID })
    if (questionStatus == '') {
        navigate(`/tests`)
    }
    useEffect(() => {
      const timer = setInterval(() => {
      setTimeLeft((prevTime:number) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    const formatTime = (time:number) => {
      let have = 0
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        if (minutes >= 0){
          return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        } else {
          have = 1
          if (have==1){
            notifications.show({
              color: "red",
              title: `${translations[lang as keyof typeof translations].noteTitle}`,
              message: `${translations[lang as keyof typeof translations].noTime}`,
              autoClose: 5000,
            })
            dispatch(setQuestionStatus(""));
            navigate("/tests")
          }
        }
    };

    const openModal = () => modals.openConfirmModal({
      size: 'sm',
      radius: 'md',
      centered: true,
      children: (
          <span className="flex justify-center font-bold text-xl text-center">
          {translations[lang as keyof typeof translations].sure}
          </span>
      ),
      labels: { confirm: `${translations[lang as keyof typeof translations].yes}`, cancel: `${translations[lang as keyof typeof translations].no}` },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        dispatch(setQuestionStatus(""));
        navigate(`/tests`);
      },
    });

    const handleResult = () =>{
      setState({ type: "SET_LOADING", payload: true });
      addMutationExam.mutate({answer: JSON.stringify(state.answer)});
      // if (state.answer?.length != examQuestions?.questions?.length){
      //     notifications.show({
      //         color: "red",
      //         title: 'Üstünlikli bolmady!',
      //         message: `Jogaby saýlanman galan sorag bar`,
      //       })
      // } else {
      //     setState({ type: "SET_LOADING", payload: true });
      //     addMutationExam.mutate({answer: JSON.stringify(state.answer)});
      // }
    }
    useEffect(() => {
      if (addMutationExam.isSuccess) {
        setState({ type: "SET_LOADING", payload: false });
        dispatch(setExamId(exam?.onlineExamID));
        navigate("/result");
      }
      if (addMutationExam.isError){
        setState({ type: "SET_LOADING", payload: false });
      }
    },[addMutationExam.status]);

    
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
                {translations[lang as keyof typeof translations].complete}
            </Button>
        </div>
        {
          isLoading
          ?
          <Center className="mt-10">
            <Loader />
          </Center>
          :
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
                              {translations[lang as keyof typeof translations].prev}
                            </Button>
                        </div>
                    </Link>
                    : null
                    }
                    <div className="w-48">
                      {
                        params?.id == examQuestions?.questions?.length
                        ?
                        <Button loading={state.loading} fullWidth size="md" onClick={handleResult}>{translations[lang as keyof typeof translations].result}</Button>
                        :
                        <Link to={`/questions/${parseInt(params?.id) + 1}`}>
                            <Button fullWidth size="md" >{translations[lang as keyof typeof translations].next}</Button>
                        </Link>
                      }
                    </div>
                    </>
                    :
                    null
                }
            </div>
        </div>
        }
        
        </>
    )
}
export default SlugQuestion;