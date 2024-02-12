import { Avatar } from "@mantine/core";
import { IconAlarm, IconDiscountCheck } from "@tabler/icons-react";


const ResultPage = () => {
    
    return(
        <>
            <h1 className="font-bold text-2xl my-10">Ваши результаты</h1>
            <div className="w-full border shadow-md flex flex-col p-5 rounded-xl bg-white">
                <div className="flex items-center mb-10">
                    <Avatar />
                    <span className="font-medium ml-2">Firstname Lastname</span>
                </div>
                <div className="w-full h-[268px] flex space-x-4">
                    <div className="bg-gray-100 w-1/2 h-full rounded-xl flex flex-col items-center justify-center">
                        <IconDiscountCheck size={25}/>
                        <span className="font-medium mt-4">Общий бал</span>
                        <p className="text-primaryBlue-200 text-6xl font-bold mt-7">78.5%</p>
                    </div>
                    <div className="bg-gray-100 w-1/2 h-full rounded-xl flex flex-col items-center justify-center">
                        <IconAlarm size={25}/>
                        <span className="font-medium mt-4">Время</span>
                        <p className="text-primaryBlue-200 text-6xl font-bold mt-7">15:00</p>
                    </div>
                </div>
                <div className="w-full h-[84px] flex space-x-4 mt-4">
                    <div className="bg-gray-100 w-1/3 rounded-xl flex flex-col justify-center items-center">
                        <span className="font-medium mb-2">Отвечено</span>
                        <p className="text-3xl leading-3 font-semibold">8/10</p>
                    </div>
                    <div className="bg-green-300 w-1/3 rounded-xl flex flex-col justify-center items-center">
                        <span className="font-medium mb-2">Правильно</span>
                        <p className="text-3xl leading-3 font-semibold">7</p>
                    </div>
                    <div className="bg-red-300 w-1/3 rounded-xl flex flex-col justify-center items-center">
                        <span className="font-medium mb-2">Неправильно</span>
                        <p className="text-3xl leading-3 font-semibold">1</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultPage;