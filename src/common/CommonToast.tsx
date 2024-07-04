import { toast } from "react-toastify";

interface ToastType {
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export const postToast = ({ message, type }: ToastType) => {
  toast[type](message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
