import { toast } from "react-hot-toast";

export const notifySuccess = (content: string) => {
  return toast.success(content);
};

export const notifyError = (content: string) => {
  return toast.error(content);
};
