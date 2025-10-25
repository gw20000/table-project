import { useEffect, useState } from "react";
import styles from './CountDown.module.scss';

const CountDown = ({endTime,className}:{endTime:number,className?:string}) => {

     const [dis,setDis] = useState<number>(endTime - Date.now())
      useEffect(()=>{
         const timer = setInterval(()=>{
              const newDis = endTime - Date.now()
              
                if(newDis<=0){
                      setDis(0)
                    clearInterval(timer)
                }
                else{
                    setDis(newDis)
                }
         },1000)
            return ()=>clearInterval(timer)
      },[endTime])
 const days = Math.floor(dis / (1000 * 60 * 60 * 24));
 const hours = Math.floor((dis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
 const minutes = Math.floor((dis % (1000 * 60 * 60)) / (1000 * 60));
 const seconds = Math.floor((dis % (1000 * 60)) / 1000);    
 const daysUI = days>0? <>days:{days}</> : null;    
if(dis===0){
    return <div>Countdown finished!</div>
}
    return <>
    <div className={[styles.container,className].join(' ')}> {daysUI} hours:{hours} mins:{minutes} sec:{seconds}</div>
    </>;
}
 
export default CountDown;