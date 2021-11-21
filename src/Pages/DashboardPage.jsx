import { useEffect, useState } from "react";
import { get } from "../api/backend";
const DashboardPage = () => {
  
  const [userEmail, setUserEmail] = useState(null);
  const [notLoggedInMessage, setNotLoggedInMessage] = useState(null);

  useEffect(()=>{
    setTimeout(()=>{
      setUserEmail(localStorage.getItem('userEmail'));
      setNotLoggedInMessage("You're not logged in");
    }, 1000);
  }, []);

  return (
    <div>
      <h5> {(userEmail) ? 'Welcome ' + userEmail : notLoggedInMessage}</h5>
    </div>
  );
};

export default DashboardPage;
