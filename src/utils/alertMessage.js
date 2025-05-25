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

export const showConfirmation = (title, text, icon) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    customClass: {
      confirmButton: 'bg-blue-500 text-white hover:bg-blue-600',
      cancelButton: 'bg-gray-300 text-gray-700 hover:bg-gray-400',
    },
  });
};
