import { store } from "react-notifications-component";

// types: success,danger,info,default,warning
export const Notification = (message, type= 'success', title = null)=>{
  
  if(! title ){
    title = type.toUpperCase();
    if(type === 'danger'){
      title = "ERROR";
    }
    if(type === 'default'){
      title = "INFO";
    }
  }

  return store.addNotification({
    marginTop:"200px",
    title,
    message,
    type,
    insert: "top",
    container: "bottom-right",
    animationIn: ["animate__animated", "animate__bounceInRight"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 6000,
      onScreen: true,
      pauseOnHover: true,
      showIcon:true,
    },

  });
}
