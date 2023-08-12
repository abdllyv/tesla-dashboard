/* ------------------------------- Sweet Alert ------------------------------ */
import Swal from "sweetalert2";

export const createRemoveAlert = (
  title,
  text,
  confirmButtonText,
  onConfirm
) => {
  Swal.fire({
    title,
    text,
    showCancelButton: false,
    confirmButtonColor: "#000",
    buttonsStyling: false,
    confirmButtonText,
    width: "770px",
    customClass: {
      container: "sweetAlert-container",
      title: "your-title-style",
      closeButton: "swal-close-button",
      confirmButton: "sweetAlert-confirm-button",
      cancelButton: "sweetAlert-cancel-button",
    },
    showCloseButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};
