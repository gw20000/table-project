// import { useEffect, useState } from 'react';
// import axios from "axios";

import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow'
import styles from './TableComponent.module.scss';
import MyIcon from './MyIcon.tsx';
import EmptyBox from './EmptyBox.tsx';
import ErrorBox from './ErrorBox.tsx';
import useUserStore from '../store/useUserStore.ts';
import type { User } from '../store/useUserStore.ts';
 



// interface ResponseUsers {
//     users: User[];
// }

const TableComoponent = () => {

    //   const [users, setUsers] = useState<User[]>([]);
    //   const [loading, setLoading] = useState<boolean>(true);
    //   const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     console.log("fetch users");
         
    //     axios.get<ResponseUsers>("http://www.test-server.com/api/users")
    //         .then((response) => {
    //             console.log("response users", response);
    //             setUsers(response.data.users);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching data:", error);
    //             setError(error.message || "Unknown error");
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });

    
    // }, []);  

    
const { users, loading, error, fetchUsers, add, del, clear, update} = useUserStore(useShallow(
  (state:any) => ({
    users: state.users,
    loading: state.loading,
    error: state.error,
    fetchUsers: state.fetchUsers,
    add: state.add,
    del: state.del,
    clear: state.clear,
    update: state.update
}
)));
 

  useEffect(() => {
    fetchUsers();
   }, [fetchUsers]);

   const addUser = () => {
    const id = new Date().getTime();
    const newUser: User = {
      id,
      name: `用户${id}`,      
      gender: Math.random() < 0.5 ? 0 : 1,     
      age: Math.floor(Math.random() * (60 - 18 + 1)) + 18,
      hobbies: '阅读, 旅行'
    }
    add(newUser);
  }

 

    const tableBodyContent = users.map((user: User) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.gender === 0 ? '男' : '女'}</td>
        <td>{user.age}</td>
        <td>{user.hobbies}</td>
        <td> 
           <button className={styles.del}onClick={()=>del(user.id)}>del</button>
            <button className={styles.update} onClick={()=>update(user.id,{age: user.age+1})}>update</button>
        </td>
      </tr>
    ));
    
    const btns = <div className={styles.btns}>
       <button className={styles.add} onClick={addUser}>add</button>
        <button className={styles.clear}onClick={clear}>clear</button>
    </div>

 const mainContent= <>
    {btns} 
    <table className={styles.container}> 
            <thead>
               <tr>
                 <th scope="col">Name</th>
                <th scope="col">Gender</th>
                 <th scope="col">Age</th>
                 <th scope="col">Hobbies</th>
                 <th scope='col'>Actions</th>
               </tr>
            </thead>
            <tbody>
             {tableBodyContent}
           </tbody>
         </table> 
    </>
    return <>
    
       { loading ? <MyIcon name='Loading' className={styles.loading}/> :
        error ?<div className={styles.error}><ErrorBox msg={error}/> </div> : users.length===0 ? <div className={styles.empty}><EmptyBox/> </div> :  
        mainContent
      }
    </>

    
}

export default TableComoponent;

