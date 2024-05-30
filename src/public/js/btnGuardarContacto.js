document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formContactos");
    const submitButton = document.getElementById("btnGuardar");
    const deleteButtons = document.querySelectorAll('.btn-danger');

    const checkFormValidity = () => {
        const isFormValid = form.checkValidity();
        submitButton.disabled = !isFormValid;
    };

    form.addEventListener("input", checkFormValidity);
    form.addEventListener("change", checkFormValidity);

    // Llama a checkFormValidity al cargar la página para asegurar que el botón está correctamente deshabilitado si los campos no están completos
    checkFormValidity();

    // Agregar evento de escucha a todos los botones de eliminar
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            const confirmed = confirm('¿Está seguro de que desea eliminar este contacto? Esta acción no se puede deshacer.');
            if (confirmed) {
                const formulario = deleteButton.closest('form');
                formulario.submit(); // Si es necesario enviar el formulario después de la confirmación
                console.log('Contacto eliminado');
            }
        });
    });
});
