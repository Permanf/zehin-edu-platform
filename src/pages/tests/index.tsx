import { Button, Grid } from "@mantine/core";
import { BreadcrumbsDemo } from "../../entities";
import { IconAlarm } from "@tabler/icons-react";

const TestPage = () => {

    const tests = [
        {id:0, name:"Test0", question_qty: 10, time:15},
        {id:1, name:"Test1", question_qty: 10, time:15},
        {id:2, name:"Test2", question_qty: 10, time:15},
        {id:3, name:"Test3", question_qty: 10, time:15},
        {id:4, name:"Test4", question_qty: 10, time:15},
        {id:5, name:"Test5", question_qty: 10, time:15},
        {id:6, name:"Test6", question_qty: 10, time:15},

    ]
    return(
        <>
            <div className="w-full h-20 rounded-xl bg-primaryBlue-100 flex items-center px-4 mt-10">
                <BreadcrumbsDemo currentPage={"Tests"} />
            </div>

            <h1 className="font-bold text-2xl my-5">Выберите тест</h1>
            
            <Grid className="my-4" gutter={{ base: 7, md: 'md', xl: "md" }}>
                {tests?.map((item:any, index:number) => {
                    return(
                        <Grid.Col key={item.id} 
                            span={{
                            base: 12,
                            xs: 6,
                            sm: 4, 
                            md: 6,
                            lg: 4 
                            }}>
                            <div className={`w-full h-40 bg-white flex flex-col rounded-xl border shadow-md p-4`}>
                                <div className="flex justify-between">
                                    <span className="font-semibold text-lg">{item.name}</span>
                                    <div className="bg-gray-100 rounded-xl px-3 py-1 font-medium flex items-center">
                                        <IconAlarm size={21} />
                                        <span className="ml-1">15 min</span>
                                    </div>
                                </div>
                                    <span className="my-3 text-gray-400">{item.question_qty} Вопросов</span>
                                    <Button
                                        fullWidth
                                        size="md"
                                    >
                                        Saylamak
                                    </Button>
                            </div>
                        </Grid.Col>
                    )
                })}
            </Grid>
        
        </>
    )
}
export default TestPage;