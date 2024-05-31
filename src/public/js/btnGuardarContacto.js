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

    // Usar jQuery para manejar eventos y la validación del formulario
    $(document).ready(function() {
        // Habilitar el botón guardar si los campos del formulario están completos
        $('#formAcciones input').on('keyup change', function() {
            let isFormValid = $('#formAcciones')[0].checkValidity();
            $('#guardarBtn').prop('disabled', !isFormValid);
        });

        // Manejar la apertura del modal para modificar una acción
        $('.modify-button').on('click', function() {
            let contactoId = $(this).data('id');
            let nombre = $(this).data('nombre');
            let apellidos = $(this).data('apellidos');
            let mail = $(this).data('mail');

            // Rellenar el formulario del modal con los datos de la acción seleccionada
            $('#modificarNombre').val(nombre);
            $('#modificarApellidos').val(apellidos);
            $('#modificarMail').val(mail);
            $('#contactoId').val(contactoId);

            // Mostrar el modal
            $('#modificarContactoModal').modal('show');
        });

        document.getElementById('cancelarModificar').addEventListener('click', function() {
            $('#modificarContactoModal').modal('hide');
        });
    });
});
