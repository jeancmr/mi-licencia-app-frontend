import Swal from 'sweetalert2';

export const showAlert = (title, text, icon) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: 'Aceptar',
    customClass: {
      confirmButton: 'bg-blue-500 text-white hover:bg-blue-600',
    },
  });
};
