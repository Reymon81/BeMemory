document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formConversaciones");
    const submitButton = document.getElementById("btnGuardar");

    const checkFormValidity = () => {
        const isFormValid = form.checkValidity();
        submitButton.disabled = !isFormValid;
    };

    form.addEventListener("input", checkFormValidity);
    form.addEventListener("change", checkFormValidity);

    // Llama a checkFormValidity al cargar la página para asegurar que el botón está correctamente deshabilitado si los campos no están completos
    checkFormValidity();
});

document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.querySelector('input[name="nombre"]');
    const dataList = document.getElementById('contactos');

    inputField.addEventListener('input', function() {
        const inputValue = this.value.toLowerCase();
        const options = dataList.querySelectorAll('option');

        options.forEach(option => {
            const optionValue = option.value.toLowerCase();
            if (optionValue.includes(inputValue)) {
                option.style.display = '';
            } else {
                option.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const deleteForms = document.querySelectorAll('.delete-form');

    deleteForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const confirmed = confirm('¿Está seguro de que desea eliminar esta conversación? Esta acción no se puede deshacer.');
            if (confirmed) {
                form.submit();
            }
        });
    });
});

$(document).ready(function() {
    // Habilitar el botón de guardar si todos los campos están llenos
    $('#formConversaciones input').on('input', function() {
        let allFilled = true;
        $('#formConversaciones input').each(function() {
            if ($(this).val() === '') {
                allFilled = false;
                return false;
            }
        });
        $('#btnGuardar').prop('disabled', !allFilled);
    });

    // Modal de confirmación de eliminación
    var deleteModal = $('#custom-modal');
    var deleteSpan = deleteModal.find('.close');
    var confirmDelete = $('#confirm-delete');
    var cancelDelete = $('#cancel-delete');
    var deleteForm;

    $('.delete-button').on('click', function() {
        deleteForm = $(this).closest('form');
        deleteModal.show();
    });

    deleteSpan.on('click', function() {
        deleteModal.hide();
    });

    cancelDelete.on('click', function() {
        deleteModal.hide();
    });

    confirmDelete.on('click', function() {
        deleteForm.submit();
    });

    $(window).on('click', function(event) {
        if (event.target == deleteModal[0]) {
            deleteModal.hide();
        }
    });

});

$(document).ready(function() {
    // Función para abrir el modal y llenar los campos con los datos de la conversación seleccionada
    function abrirModalModificar(id, nombre, conversacion) {
        // Llenar los campos del formulario con los datos de la conversación
        $('#modificarId').val(id);
        $('#modificarNombre').val(nombre);
        $('#modificarConversacion').val(conversacion);
        
        // Mostrar el modal
        $('#modificarConversacionModal').modal('show');
    }

    // Evento click en los botones de modificar
    $('.modify-button').on('click', function() {
        // Obtener los datos de la conversación desde los atributos data del botón
        var id = $(this).data('id');
        var nombre = $(this).data('nombre');
        var conversacion = $(this).data('conversacion');
        
        // Llamar a la función para abrir el modal y llenar los campos
        abrirModalModificar(id, nombre, conversacion);
    });
});

$(document).ready(function() {
    // Agrega un controlador de eventos de clic al botón de cancelar
    // Manejar el cierre del modal sin realizar cambios
    $('#cancelarModificar').on('click', function() {
        $('#modificarConversacionModal').modal('hide');
    });
});