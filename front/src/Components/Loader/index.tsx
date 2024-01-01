import Loader1 from "./Loader1";

const index = (props) => {
    const {type=1 , text='در حال بارگزاری...'} = props
   if(type===1){
       return <Loader1  text={text}/>
   }
};

export default index;
