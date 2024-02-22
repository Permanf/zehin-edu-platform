import { Button} from "@mantine/core";
import { BreadcrumbsDemo } from "../../../entities";
import { modals } from '@mantine/modals';
import { IconAlarm, IconChevronLeft } from "@tabler/icons-react";
import { setExamData, setQuestionStatus} from "../../../store/actions/data";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetQuestions } from "../../../hooks/questions/useGetQuestions";
import { useEffect, useState } from "react";
import translations from "../translation";
import { getLang } from "../../../store/selectors/auth";

const TestSlugPage = () => {
    const [question, setQuestion] = useState<any>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const params = useParams()
    const lang = useSelector(getLang);
    const {data: tests } = useGetQuestions();
    
    useEffect(()=>{
        if(tests?.onlineExams){
            tests?.onlineExams?.forEach((item:any)=>{
                if (item.onlineExamID == params.id){
                    setQuestion(item);
                }
            })
        }
    },[tests?.onlineExams])
    
    const items = [
        { title: `${translations[lang as keyof typeof translations].test}`, href: '/tests' },
        { title: `${translations[lang as keyof typeof translations].test} - ${params.id}`, href: '' },
      ]

    const openModal = () => modals.openConfirmModal({
        // title: 'Please confirm your action',
        size: 'sm',
        radius: 'md',
        centered: true,
        children: (
          <span className="flex justify-center font-bold text-xl text-center">
            {translations[lang as keyof typeof translations].sure}
          </span>
        ),
        labels: { confirm: `${translations[lang as keyof typeof translations].start}`, cancel: `${translations[lang as keyof typeof translations].cancel}` },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => {
            console.log('Confirmed');
            dispatch(setQuestionStatus("start"));
            dispatch(setExamData(question));
            navigate(`/questions/1?id=${question.onlineExamID}`);
        },
      });
    return(
        <>
            <div className="w-full h-20 rounded-xl bg-blue-100 flex items-center px-4 mt-10">
                <BreadcrumbsDemo currentPage={`${translations[lang as keyof typeof translations].test} - ${params.id}`} items={items} />
            </div>
            <div className="w-full h-14 bg-primaryBlue-200 rounded-xl flex items-center px-4 my-8">
                <IconChevronLeft size={20} className="mr-2"/>
                <h1 className="font-bold text-xl my-5 text-white">{question?.name}</h1>
            </div>

            <div className="w-full border shadow-md flex flex-col p-5 rounded-xl bg-white">
                <span className="font-medium text-lg">{translations[lang as keyof typeof translations].titleRule}</span>
                <span className="font-medium text-base my-4">{translations[lang as keyof typeof translations].desc}</span>
                <div className="text-sm text-gray-400 w-1/2"
                    dangerouslySetInnerHTML={{ __html: translations[lang as keyof typeof translations].rule }}
                />
                <span className="font-medium text-base my-4">{translations[lang as keyof typeof translations].time}</span>
                <div className="bg-gray-100 rounded-xl px-4 py-2 font-medium flex items-center w-28">
                    <IconAlarm size={22} />
                    <span className="ml-1">{question?.duration} {translations[lang as keyof typeof translations].min}</span>
                </div>
                <div className="w-64 mt-5">
                    <Button fullWidth size="md" onClick={openModal}>{translations[lang as keyof typeof translations].start}</Button>
                </div>
            </div>
            
        
        </>
    )
}
export default TestSlugPage;