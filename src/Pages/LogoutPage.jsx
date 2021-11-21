import { useEffect } from "react";

const LogoutPage = (props)=>{

  useEffect(()=>{

    props.setUserLoggedIn('from logout component');
  },[]);

  return (
    <h5>You logged out successfully.</h5>
  );
};

export default LogoutPage;