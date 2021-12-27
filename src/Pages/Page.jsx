import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import ProfilePage from "./ProfilePage";
import PostPage from "./PostPage";
import Home from "./Home";
import LogoutPage from "./LogoutPage";
import { get } from '../api/backend';
import {Notification} from '../components/Notification/Notification';

const PageLayout = (props) => { 

  const saveUserInformation = (token)=>{
    if(token && token.length > 100){
      localStorage.setItem("userToken", token);
    }else{
      localStorage.removeItem('userToken');
    }
    get('/user').then(data=>{
      console.log('dashboard page', data);
      localStorage.setItem('userId', data.data.id);
      localStorage.setItem('userEmail', data.data.email);
      localStorage.setItem('userType', data.data.type);
      Notification("You logged in successfully.");
    }).catch((e)=>{
      Notification('Your username or password is wrong', 'danger', 'Error');
    });
    
  };

  return (
    <div
      style={{
        backgroundColor: "#eee",
      }}
    >
      <div style={{ padding: "10px" }}>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>

          <Route path="/dashboard">
            <DashboardPage />
          </Route>
          <Route path="/login">
            <LoginPage
              userCookie={props.userCookie}
              setUserCookie={props.setUserCookie}
              removeUserCookie={props.removeUserCookie}
              setUserLoggedIn={props.setUserLoggedIn}
              saveUserInformation={saveUserInformation}
            />
          </Route>
          <Route path="/register">
            <RegisterPage
              setUserLoggedIn={props.setUserLoggedIn} 
              saveUserInformation={saveUserInformation}
            />
          </Route>
          <Route path="/forgot-password">
            <ForgotPasswordPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/logout">
            <LogoutPage
              setUserLoggedIn={props.setUserLoggedIn}
            />
          </Route>

          <Route path="/posts/:id?">
            <PostPage adminActiveMenu={props.adminActiveMenu} />
            {/* <Loading/> */}
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default PageLayout;
