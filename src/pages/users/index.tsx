import { Avatar, Table } from '@mantine/core';
import { useGetUsers } from '../../hooks/users/useGetUsers';

const  Users = () => {
    const { data } = useGetUsers();
    console.log(data?.data,"---users")
    const elements = [
        { id:0, name: "Firstname Lastname", sum:10, correct: 7, incorrect: 1, status: 'Carbon',  ball: 80},
        { id:1, name: "Firstname Lastname", sum:10, correct: 7, incorrect: 1, status: 'Carbon',  ball: 70},
        { id:2, name: "Firstname Lastname", sum:10, correct: 7, incorrect: 1, status: 'Carbon',  ball: 40},
    ];
  const rows = elements.map((element:any) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>
        <div className='flex items-center'>
            <Avatar /> 
            <span className='ml-2'>{element.name}</span>
        </div>
      </Table.Td>
      <Table.Td>{element.sum}</Table.Td>
      <Table.Td>{element.correct}</Table.Td>
      <Table.Td>{element.incorrect}</Table.Td>
      <Table.Td>{element.status}</Table.Td>
      <Table.Td>{element.ball}</Table.Td>

    </Table.Tr>
  ));

  return (
    <div className='bg-white rounded-xl border shadow-md mt-10 p-5'>
    <Table verticalSpacing="md" striped >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Id</Table.Th>
          <Table.Th>Имя</Table.Th>
          <Table.Th>Отвечено</Table.Th>
          <Table.Th>Правильно</Table.Th>
          <Table.Th>Неправильно</Table.Th>
          <Table.Th>Статус</Table.Th>
          <Table.Th>Бал</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    </div>
  );
}

export default Users;