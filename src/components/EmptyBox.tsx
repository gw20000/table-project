
 import styles from './EmptyBox.module.scss';
function EmptyBox({className}:{className?:string}) {
    return <div className={[styles.container,className].join(' ')}>No Data</div>;
}

export default EmptyBox;