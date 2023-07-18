import { isLogin, isModal } from "./actionType"

  const login=(payload)=>{
return {
    type:isLogin,
    payload
}
 }

 const setModalOpen=(payload)=>{
    return {
        type:isModal,
        payload
    }
 }

 export {login,setModalOpen}
 