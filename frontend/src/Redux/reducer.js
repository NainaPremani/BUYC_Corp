import { isLogin, isModal } from "./actionType";

const initState = {
  loginStatus: false,
  modalStatus: false,
};
export const loginReducer = (state = initState, action) => {
  console.log("action", action);
  switch (action.type) {
    case isLogin:
      console.log("isLogin");
      return {
        ...state,
        loginStatus: action.payload,
      };

    default:
      return state;
      console.log("default");
  }
};

export const modalReducer = (state = initState, action) => {
  console.log("action", action);
  switch (action.type) {
    case isModal:
      return {
        ...state,
        modalStatus: action.payload,
      };

    default:
      return state;
  }
};
