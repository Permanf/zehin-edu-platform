import { Button, Center, Grid, Loader } from "@mantine/core";
import { BreadcrumbsDemo } from "../../entities";
import { IconAlarm } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useGetQuestions } from "../../hooks/questions/useGetQuestions";
import Lottie from "lottie-react";
import Notfound from "../../assets/searchnotfound.json";
import translations from "./translation";
import { useSelector } from "react-redux";
import { getLang } from "../../store/selectors/auth";

interface IOnlineExam{
    id: number;
    name: string;
    duration: string;
    questionCount: number;
    onlineExamID: number;
}

const TestPage = () => {
    const lang = useSelector(getLang);
    const items = [
        { title: `${translations[lang as keyof typeof translations].auth}`, href: '/auth/login' },
        { title: `${translations[lang as keyof typeof translations].tests}`, href: '/tests' },
      ]
    const {data: tests , isLoading } = useGetQuestions();
    return(
        <>
            <div className="w-full h-20 rounded-xl bg-primaryBlue-100 flex items-center px-4 mt-10">
                <BreadcrumbsDemo currentPage={translations[lang as keyof typeof translations].tests} items={items} />
            </div>

            <h1 className="font-bold text-2xl my-5">{translations[lang as keyof typeof translations].selectTest}</h1>
            {
                isLoading
                ?
                <Center className="mt-10">
                    <Loader />
                </Center>
                :
                tests?.onlineExams?.length == 0
                ?
                <Center className="flex flex-col mt-20">
                    <Lottie animationData={Notfound} loop={true} className="w-48" />
                    <span className="text-sm">No data</span>
                </Center>
                :
                <Grid className="my-4" gutter={{ base: 7, md: 'md', xl: "md" }}>
                    {tests?.onlineExams?.map((item:IOnlineExam) => {
                        return(
                            <Grid.Col key={item.id} 
                                span={{
                                base: 12,
                                xs: 6,
                                sm: 4, 
                                md: 6,
                                lg: 4 
                                }}>
                                <div className={`w-full bg-white flex flex-col rounded-xl border shadow-md p-4`}>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-lg">{item.name}</span>
                                        <div className="bg-gray-100 rounded-xl px-3 py-1 font-medium flex items-center">
                                            <IconAlarm size={21} />
                                            <span className="ml-1">{item?.duration} {translations[lang as keyof typeof translations].min}</span>
                                        </div>
                                    </div>
                                        <span className="my-3 text-gray-400">{item?.questionCount} {translations[lang as keyof typeof translations].questions}</span>
                                        <Link to={`/tests/${item?.onlineExamID}`}>
                                        <Button
                                            fullWidth
                                            size="md"
                                            >
                                            {translations[lang as keyof typeof translations].select}
                                        </Button>
                                        </Link>
                                </div>
                            </Grid.Col>
                        )
                    })}
                </Grid>
            }
        
        </>
    )
}
export default TestPage;