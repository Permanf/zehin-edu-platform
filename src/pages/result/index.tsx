import { Avatar } from "@mantine/core";
import { IconAlarm, IconDiscountCheck } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { getLang, getUser } from "../../store/selectors/auth";
import { getExamId } from "../../store/selectors/data";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import translations from "./translation";


const ResultPage = () => {
    const [result, setResult] = useState<any>(null);
    const user = useSelector(getUser);
    const examID = useSelector(getExamId);
    const lang = useSelector(getLang)
    const navigate = useNavigate()
    if (examID == null){
        navigate("/tests")
    }
    useEffect(()=>{
        user?.examresults?.forEach((item:{onlineExamID: number})=>{
            if (item.onlineExamID == 1){
                setResult(item);   
            }
        })
    },[user, examID])
    return(
        <>
            <h1 className="font-bold text-2xl my-10">{translations[lang as keyof typeof translations].result}</h1>
            <div className="w-full border shadow-md flex flex-col p-5 rounded-xl bg-white">
                <div className="flex items-center mb-10">
                    <Avatar src={user?.photo} />
                    <span className="font-medium ml-2">{user?.name}</span>
                </div>
                <div className="w-full h-[268px] flex space-x-4">
                    <div className="bg-gray-100 w-1/2 h-full rounded-xl flex flex-col items-center justify-center">
                        <IconDiscountCheck size={25}/>
                        <span className="font-medium mt-4">{translations[lang as keyof typeof translations].totalScore}</span>
                        <p className="text-primaryBlue-200 text-6xl font-bold mt-7">{result?.totalPercentage}%</p>
                    </div>
                    <div className="bg-gray-100 w-1/2 h-full rounded-xl flex flex-col items-center justify-center">
                        <IconAlarm size={25}/>
                        <span className="font-medium mt-4">{translations[lang as keyof typeof translations].time}</span>
                        <p className="text-primaryBlue-200 text-6xl font-bold mt-7">{result?.duration}</p>
                    </div>
                </div>
                <div className="w-full h-[84px] flex space-x-4 mt-4">
                    <div className="bg-gray-100 w-1/3 rounded-xl flex flex-col justify-center items-center">
                        <span className="font-medium mb-2">{translations[lang as keyof typeof translations].answered}</span>
                        <p className="text-3xl leading-3 font-semibold">{result?.totalAnswer}/{result?.totalQuestion}</p>
                    </div>
                    <div className="bg-green-300 w-1/3 rounded-xl flex flex-col justify-center items-center">
                        <span className="font-medium mb-2">{translations[lang as keyof typeof translations].correctly}</span>
                        <p className="text-3xl leading-3 font-semibold">{result?.totalCurrectAnswer}</p>
                    </div>
                    <div className="bg-red-300 w-1/3 rounded-xl flex flex-col justify-center items-center">
                        <span className="font-medium mb-2">{translations[lang as keyof typeof translations].wrong}</span>
                        <p className="text-3xl leading-3 font-semibold">{ parseInt(result?.totalAnswer) - parseInt(result?.totalCurrectAnswer)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultPage;