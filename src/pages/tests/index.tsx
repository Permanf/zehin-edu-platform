import { Button, Center, Grid, Loader } from "@mantine/core";
import { BreadcrumbsDemo } from "../../entities";
import { IconAlarm } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useGetQuestions } from "../../hooks/questions/useGetQuestions";
import Lottie from "lottie-react";
import Notfound from "../../assets/searchnotfound.json";

const TestPage = () => {
    const items = [
        { title: 'Авторизоваться', href: '/auth/login' },
        { title: 'Тесты', href: '/tests' },
      ]
    // const tests = [
    //     {id:0, name:"Test0", question_qty: 10, time:15},
    //     {id:1, name:"Test1", question_qty: 10, time:15},
    //     {id:2, name:"Test2", question_qty: 10, time:15},
    //     {id:3, name:"Test3", question_qty: 10, time:15},
    //     {id:4, name:"Test4", question_qty: 10, time:15},
    //     {id:5, name:"Test5", question_qty: 10, time:15},
    //     {id:6, name:"Test6", question_qty: 10, time:15},

    // ]
    const {data: tests , isLoading } = useGetQuestions();
    // const {data: testById} = useGetQuestionById({id: `3`});
    
    // console.log(tests,"--tests")
    // console.log(testById,"--testsId")
    return(
        <>
            <div className="w-full h-20 rounded-xl bg-primaryBlue-100 flex items-center px-4 mt-10">
                <BreadcrumbsDemo currentPage={"Тесты"} items={items} />
            </div>

            <h1 className="font-bold text-2xl my-5">Выберите тест</h1>
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
                    {tests?.onlineExams?.map((item:any) => {
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
                                            <span className="ml-1">{item?.duration} мин</span>
                                        </div>
                                    </div>
                                        <span className="my-3 text-gray-400">{item?.questionCount} Вопросов</span>
                                        <Link to={`/tests/${item?.onlineExamID}`}>
                                        <Button
                                            fullWidth
                                            size="md"
                                            >
                                            Выберите
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