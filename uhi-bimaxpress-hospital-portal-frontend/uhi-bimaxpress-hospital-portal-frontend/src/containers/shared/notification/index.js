import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function notification(
    type = '',
    content = '',
    position = 'top-right',
    autoClose = 5000,
    hideProgressBar = false,
    closeOnClick = true,
    pauseOnHover = true,
    draggable = true,
    progress = undefined
) {
    console.log(type);
    if (type === 'success') {
        return toast.success(content, {
            position,
            autoClose,
            hideProgressBar,
            closeOnClick,
            pauseOnHover,
            draggable,
            progress,
        });
    }
    if (type === 'error') {
        return toast.error(content, {
            position,
            autoClose,
            hideProgressBar,
            closeOnClick,
            pauseOnHover,
            draggable,
            progress,
        });
    }
    if (type === 'info') {
        return toast.info(content, {
            position,
            autoClose,
            hideProgressBar,
            closeOnClick,
            pauseOnHover,
            draggable,
            progress,
        });
    }
    if (type === 'warning') {
        return toast.warning(content, {
            position,
            autoClose,
            hideProgressBar,
            closeOnClick,
            pauseOnHover,
            draggable,
            progress,
        });
    }
    return toast.default(content, {
        position,
        autoClose,
        hideProgressBar,
        closeOnClick,
        pauseOnHover,
        draggable,
        progress,
    });
};
