
 import styles from './ErrorBox.module.scss';
function EmptyBox({msg,className}:{msg:string,className?:string}) {
    return <div className={[styles.container,className].join(' ')}>{msg}</div>;
}

export default EmptyBox;