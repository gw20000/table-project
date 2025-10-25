

import { AiOutlineLoading3Quarters as Loading } from 'react-icons/ai';
import { BsSearch as Search } from 'react-icons/bs';
interface Props {
  name:'Loading' | 'Search';
  className?:string;
}

const iconMap = {     
      Loading,
      Search
}

function MyIcon({name,className}:Props) {
    const IconComponent = iconMap[name];
    return <IconComponent className={className} />;
}

export default MyIcon;