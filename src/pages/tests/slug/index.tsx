import { Button, Grid, Text } from "@mantine/core";
import { BreadcrumbsDemo } from "../../../entities";
import { modals } from '@mantine/modals';
import { IconAlarm } from "@tabler/icons-react";

const TestSlugPage = () => {

    const tests = [
        {id:0, name:"Test0", question_qty: 10, time:15},
        {id:1, name:"Test1", question_qty: 10, time:15},
        {id:2, name:"Test2", question_qty: 10, time:15},
        {id:3, name:"Test3", question_qty: 10, time:15},
        {id:4, name:"Test4", question_qty: 10, time:15},
        {id:5, name:"Test5", question_qty: 10, time:15},
        {id:6, name:"Test6", question_qty: 10, time:15},

    ]
    const rule = `Тест состоит из 10 вопросов, каждый из которых имеет 4 варианта ответа. 

    Выберите верный вариант из четырех предложенных и отметьте его. 
    После ответа на все вопросы нажмите кнопку "Далее". 

    Вы можете вернуться на предыдущий вопрос если вспомнили правильный 
    вариант ответа`;

    const openModal = () => modals.openConfirmModal({
        // title: 'Please confirm your action',
        size: 'sm',
        radius: 'md',
        centered: true,
        children: (
          <span className="flex justify-center font-bold text-xl">
            Вы уверены что <br /> хотите начать?
          </span>
        ),
        labels: { confirm: 'Начать', cancel: 'Отмена' },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => console.log('Confirmed'),
      });
    return(
        <>
            <div className="w-full h-20 rounded-xl bg-blue-100 flex items-center px-4 mt-10">
                <BreadcrumbsDemo currentPage={"Tests"} />
            </div>
            <div className="w-full h-14 bg-primaryBlue-200 rounded-xl flex items-center px-4 my-8">
                <h1 className="font-bold text-xl my-5 text-white">Название теста</h1>
            </div>

            <div className="w-full border shadow-md flex flex-col p-5 rounded-xl bg-white">
                <span className="font-medium text-lg">Условия теста</span>
                <span className="font-medium text-base my-4">Описание</span>
                <div className="text-sm text-gray-400 w-1/2"
                    dangerouslySetInnerHTML={{ __html: rule }}
                />
                <span className="font-medium text-base my-4">Время</span>
                <div className="bg-gray-100 rounded-xl px-4 py-2 font-medium flex items-center w-28">
                    <IconAlarm size={22} />
                    <span className="ml-1">15 min</span>
                </div>
                <div className="w-64 mt-5">
                    <Button fullWidth size="md" onClick={openModal}>Начать</Button>
                </div>
            </div>
            
        
        </>
    )
}
export default TestSlugPage;