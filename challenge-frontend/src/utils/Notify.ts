import {Bounce, toast} from "react-toastify";

export const notifyCustom = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    toast[type](message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce
    });
}