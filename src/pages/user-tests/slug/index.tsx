import { useParams } from "react-router-dom"
import { useGetExamHistory } from "../../../hooks/profile/useGetExamHistory";
import { Grid } from "@mantine/core";


const UserExamHistory = () =>{
    const params = useParams();
    const {data: history} = useGetExamHistory({id: params.id});
    console.log(history);
    return(
        <div className="w-full mt-10">
            <div className="flex flex-wrap justify-between text-xl font-semibold">
                <span>Synag: {history?.examHistory?.name}</span>
                <span>Umumy bal: {history?.examHistory?.totalMark}</span>
                <span>Umumy baha: </span>
                <span>Dowamlylygy: {history?.examHistory?.duration} min</span>
            </div>
            <div className="flex flex-col font-medium mt-10">
                <span>Sorag sany: {history?.examHistory?.totalQuestion}</span>
                <span>Jogaplanan: {history?.examHistory?.totalAnswer}</span>
                <span>Dogry jogap: {parseInt(history?.examHistory?.totalAnswer) - history?.examHistory?.wrong }</span>
                <span>Ýalnyş jogap: {history?.examHistory?.wrong}</span>
            </div>
            <Grid className="my-4 mt-[5rem]" gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
            {history?.questions?.map((item:any, index:number)=>{
                return(
                <Grid.Col 
                    span={{
                    base: 6,
                    xs: 12,
                    sm: 12, 
                    md: 6,
                    lg: 6 
                    }}>
                    {item.typeNumber == 1 || item.typeNumber == 2
                    ?
                    <>
                    <div className="flex items-center space-x-4">
                    <span className="font-medium">{index+1}.</span>
                        <div className="flex justify-center items-center w-10 h-10 rounded-full border">A</div>
                        <div className="flex justify-center items-center w-10 h-10 rounded-full border">B</div>
                        <div className="flex justify-center items-center w-10 h-10 rounded-full border">C</div>
                        <div className="flex justify-center items-center w-10 h-10 rounded-full border">D</div>
                    </div>
                    </>
                    :
                    <div className="flex">
                        <span className="font-medium">{index+1}. {history?.examquestionsuseranswer[item?.questionBankID].text}</span>
                    </div>
                    }
                </Grid.Col>
                )
            })}
        </Grid>
        </div>
    )
}

export default UserExamHistory