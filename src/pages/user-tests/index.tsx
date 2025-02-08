import { Avatar, Table } from '@mantine/core';
import { useSelector } from 'react-redux';
import { getLang, getUser } from '../../store/selectors/auth';
import translations from './translation';

interface IExamResults{
  onlineExamID: string;
  userID: number;
  totalAnswer: number;
  totalCurrectAnswer: string;
  totalQuestion: string;
  statusID: number;
  totalMark: string;
}

const  Users = () => {
  const user = useSelector(getUser);
  const lang= useSelector(getLang);
  const rows = user?.examresults?.map((element:IExamResults) => (
    <Table.Tr key={element.onlineExamID}>
      <Table.Td>{element.userID}</Table.Td>
      <Table.Td>
        <div className='flex items-center'>
            <Avatar src={user?.photo} /> 
            <span className='ml-2'>{user.name}</span>
        </div>
      </Table.Td>
      <Table.Td>{element?.totalAnswer}</Table.Td>
      <Table.Td>{element?.totalCurrectAnswer}</Table.Td>
      <Table.Td>{parseInt(element?.totalQuestion) - parseInt(element?.totalCurrectAnswer)}</Table.Td>
      <Table.Td>{element.statusID}</Table.Td>
      <Table.Td>{element?.totalMark}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div className='bg-white rounded-xl border shadow-md mt-10 p-5'>
    <Table verticalSpacing="md" striped >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Id</Table.Th>
          <Table.Th>{translations[lang as keyof typeof translations].name}</Table.Th>
          <Table.Th>{translations[lang as keyof typeof translations].answered}</Table.Th>
          <Table.Th>{translations[lang as keyof typeof translations].correctly}</Table.Th>
          <Table.Th>{translations[lang as keyof typeof translations].wrong}</Table.Th>
          <Table.Th>{translations[lang as keyof typeof translations].status}</Table.Th>
          <Table.Th>{translations[lang as keyof typeof translations].totalScore}</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    </div>
  );
}

export default Users;