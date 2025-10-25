import { useSelector,useDispatch } from "react-redux";
import {selectCount,selectLoading,selectError,increment,initializeCountAsync } from "../store/counterSlice.ts";
 

const Counter = () => {
   // subscribe to redux state
    const count =  useSelector(selectCount)
     const loading =  useSelector(selectLoading)
      const error =  useSelector(selectError)
   // get dispatch fn to dispatch actions
    const dispatch = useDispatch()

    return<>
        <div className="counter">
            {count}
        </div>
        <button onClick={()=>dispatch(increment())}>+1</button>
        <button onClick={()=>initializeCountAsync(dispatch)}> {
        (loading && 'loading...') || (error && <div style={{color:'red'}}>{error}</div>) || 'async initialize count'
}</button>
    </>;
}
 
export default Counter;

 