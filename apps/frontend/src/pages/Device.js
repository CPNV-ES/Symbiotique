import {useParams} from "react-router-dom";

function Device () {
  const {id} = useParams();

  return(
    <h1>ID : {id}</h1>
  );
}

export default Device
