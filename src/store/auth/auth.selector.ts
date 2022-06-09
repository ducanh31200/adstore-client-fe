import { State } from ".";

export const selector = (state: State) => {
  return {
    isLoggedIn: state.isLoggedIn,
    data: state.data,
  };
};
