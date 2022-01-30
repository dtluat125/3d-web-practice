import { toast } from "react-toastify";
import "./toast.scss";

toast.configure();

export const toastInformSuccess = (message, positions) => {
  toast.success(message, {
    position: positions || "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    className: "styled-success-on-switch-status",
    icon: false,
    closeButton: false,
  });
  return null;
};
export const toastError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "styled-success-on-switch-status",
    closeButton: false,
  });
  return null;
};
