
import { useEffect } from 'react';
import styles from './TodoList.module.scss'
import { useSelector,useDispatch } from "react-redux";
//use redux state n actions in react components 
 import { selectTodos,selectLoading, selectError, add,del,fetchtTodosAsync} from '../store/todosSlice.ts';
// use type from redux state slice 
 import type { Todo } from '../store/todosSlice.ts';
 import MyIcon from './MyIcon.tsx';
 import ErrorBox from './ErrorBox.tsx';
import EmptyBox from './EmptyBox.tsx';


//   const testData = [

//   {

//     "id": 1,

//     "status": "In Progress",

//     "title": "Account Manager",

//     "createDate": "2025-10-01",

//     "createBy ": "Administrator"

//   },

//   {

//     "id": 2,

//     "status": "Completed",

//     "title": "Finance Analyst",

//     "createDate": "2025-09-20",

//     "createBy": "Geoffrey"

//   },

//   {

//     "id": 3,

//     "status": "Completed",

//     "title": "Marketing Specialist",

//     "createDate": "2025-08-15",

//     "createBy": " System"

//   }

// ];
  const iterator = {
   value: -1,
   next: function() {
       this.value++;
       return this.value;
   }
  }

const getTestTodo = ():Todo=>{
  return  {
   id: new Date().getTime(),

   status: Math.random()>0.5? 'complete' : 'incomplete' ,

    title: "task"+iterator.next(),
  }
}

const  TodoList = () => {

// const [todos,setTodos] = useState(testData)

// const add = ()=>{
//     const num = iterator.next()
//     setTodos([{
//     "id": new Date().getTime(),

//     "status": "In Progress"+num,

//     "title": "Account Manager"+num,

//     "createDate": "2025-10-04",

//     "createBy ": "Administrator"+num
// },...todos])
// }

// const del = (id:number)=>{

//     const newTodos = todos.filter(todo=>{
//       if(todo.id!==id){
//      return true
//       }
//       return false
//     })
//      setTodos(newTodos)
// }

const todos = useSelector(selectTodos)
const loading = useSelector(selectLoading)
const error = useSelector(selectError)
const dispatch = useDispatch()

useEffect(()=>{
   fetchtTodosAsync(dispatch)
},[dispatch])

 const list = todos.map(({id,title,status},index)=>{
   return <li key={id}>
        <div className={styles.num}>{todos.length-index}</div>
        <div className={styles.title}> {title}</div>
         <div> {status}</div>
          <div >
        <button className={styles['btn-del']} onClick={()=>dispatch(del(id))}>del</button>
          </div>
  
   </li>
 })

 const btns =  <div className={styles.btns}>
        <button className={styles['btn-add']} onClick={()=>dispatch(add(getTestTodo()))}>add</button>
    </div>

 
     if(loading) return <MyIcon name='Loading' className={styles.loading}/>
     if(error) return <ErrorBox msg={error}/>
     if(todos.length===0) return <EmptyBox/>
     return <>
     {btns}
     <ul className={styles.container}>
     {list}</ul>
     </>
  
}
export default TodoList