import { State } from ".";

export const selector = (state: State) => {
  return {
    data: state.data,
    count: state.count,
  };
};
