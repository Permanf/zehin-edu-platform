import { Button, CheckIcon, Grid, Radio } from "@mantine/core";
import { Stepper } from "../../../entities";
import { IconAlarm, IconChevronLeft, IconXboxX } from '@tabler/icons-react';

const SlugQuestion = () => {
    return(
        <>
        <div className="flex justify-between my-10">
            <div className="bg-white rounded-xl px-4 py-2 font-medium flex items-center">
                <IconAlarm size={22} />
                <span className="ml-1">14:32</span>
            </div>
            <div className="bg-red-300 rounded-xl text-white px-4 py-2 flex items-center">
                <span className="mr-1">Завершить тест</span>
                <IconXboxX size={20} />
            </div>
        </div>
        
        <div className="w-full p-5 border rounded-xl shadow-md bg-white">
            <Stepper />
            <div className="w-full my-10">
                <h1 className="font-bold text-2xl my-5">Выберите тест</h1>
                <Grid className="my-4" gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
                    {[1,2,3,4]?.map((item:any, index:number) => {
                        return(
                            <Grid.Col key={item.id} 
                                span={{
                                base: 6,
                                xs: 12,
                                sm: 12, 
                                md: 6,
                                lg: 6 
                                }}>
                                <div key={index} className={`flex items-center w-full`}>
                                    <Radio icon={CheckIcon} name="check" className="cursor-pointer" />
                                    <div className="rounded-xl h-12 bg-gray-100 w-full ml-3 cursor-pointer flex justify-center items-center font-medium">Answer {item}</div>
                                
                                </div>
                            </Grid.Col>
                        )
                    })}
                </Grid>
            </div>
            <div className="w-full flex justify-center mt-5">
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
                <div className="w-48">
                    <Button fullWidth size="md">Далее</Button>
                </div>
            </div>
        </div>
        </>
    )
}
export default SlugQuestion;