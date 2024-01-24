import React from 'react'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function DeletePost() {
  const navigate = useNavigate();
  const {curruentUser, setCurruentUser} = React.useContext(UserContext);
  const token = curruentUser?.token;

  React.useEffect(()=>{
    if(!token){
      navigate("/login");
    }
  },[]);

  return (
    <div>DeletePost</div>
  )
}

export default DeletePost