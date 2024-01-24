import React from 'react'
import { UserContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

function Logout() {

  const {setCurruentUser} = React.useContext(UserContext);
  const navigate = useNavigate();

  setCurruentUser(null);
  navigate("/login");
  return (
    <>

    </>
  )
}

export default Logout