import Admin from "./Admin/Admin";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css';

const App = () => {
  
  
  return (
    <div className="app-container">
      <ReactNotification />
      <Admin />
    </div>
  );
};

export default App;
