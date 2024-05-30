document.addEventListener('DOMContentLoaded', () => {
    // Variables y elementos del formulario
    const form = document.getElementById('formAcciones');
    const guardarBtn = document.getElementById('guardarBtn');
    const contacto = form.querySelector('input[name="contacto"]');
    const accion = form.querySelector('input[name="accion"]');
    const fecha = form.querySelector('input[name="fecha"]');
    const dataList = document.getElementById('contactos');
    const inputField = document.querySelector('input[name="contacto"]');
    const deleteForms = document.querySelectorAll('.delete-form');
    const cancelarModificarBtn = document.getElementById('cancelarModificar');

    // Función para verificar la validez del formulario
    function checkForm() {
        if (contacto.value && accion.value && fecha.value) {
            guardarBtn.disabled = false;
        } else {
            guardarBtn.disabled = true;
        }
    }

    // Evento para habilitar/deshabilitar el botón Guardar
    contacto.addEventListener('input', checkForm);
    accion.addEventListener('input', checkForm);
    fecha.addEventListener('input', checkForm);

    // Filtrar las opciones del datalist en tiempo real
    inputField.addEventListener('input', function() {
        const inputValue = this.value.toLowerCase();
        const options = dataList.querySelectorAll('option');

        options.forEach(option => {
            const optionValue = option.value.toLowerCase();
            option.style.display = optionValue.includes(inputValue) ? '' : 'none';
        });
    });

    // Confirmación antes de eliminar una acción
    deleteForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const confirmed = confirm('¿Está seguro de que desea eliminar esta acción? Esta acción no se puede deshacer.');
            if (confirmed) {
                form.submit();
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
            let accionId = $(this).data('id');
            let contacto = $(this).data('contacto');
            let accion = $(this).data('accion');
            let fecha = $(this).data('fecha');

            // Convertir la fecha al formato esperado (DD/MM/AAAA -> AAAA-MM-DD)
            let fechaParts = fecha.split('/');
            let formattedFecha = fechaParts[2] + '-' + fechaParts[1] + '-' + fechaParts[0];

            // Rellenar el formulario del modal con los datos de la acción seleccionada
            $('#modificarContacto').val(contacto);
            $('#modificarAccion').val(accion);
            $('#modificarFecha').val(formattedFecha);
            $('#accionId').val(accionId);

            // Mostrar el modal
            $('#modificarAccionModal').modal('show');
        });

        // Manejar el cierre del modal sin realizar cambios
        $('#cancelarModificar').on('click', function() {
            $('#modificarAccionModal').modal('hide');
        });
    });
});
