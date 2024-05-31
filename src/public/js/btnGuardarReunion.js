document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formReuniones");
    const submitButton = document.getElementById("btnGuardar");
    const deleteButtons = document.querySelectorAll('.btn-danger');
    const modifyButtons = document.querySelectorAll('.modify-button');
    const btnAbrirPopup = document.getElementById("btnAbrirPopup");
    const btnSeleccionarContactos = document.getElementById("btnSeleccionar");
    const cancelarModificar = document.getElementById('cancelarModificar');
    const btnAbrirPopupModificar = document.getElementById("btnAbrirPopupModificar");

    const checkFormValidity = () => {
        submitButton.disabled = !form.checkValidity();
    };

    const addEventListenersToFields = () => {
        const fields = form.querySelectorAll("input, select, textarea");
        fields.forEach(field => {
            field.addEventListener("input", checkFormValidity);
            field.addEventListener("change", checkFormValidity);
        });
    };

    const openModal = (modalId) => {
        $(`#${modalId}`).modal('show');
    };

    const closeModal = (modalId) => {
        $(`#${modalId}`).modal('hide');
    };

    const handleSeleccionarContactos = () => {
        const contactosCheckboxes = document.querySelectorAll("#formListaContactos input[type='checkbox']:checked");
        const contactosInput = document.getElementById("contactos");
        const contactosSeleccionados = Array.from(contactosCheckboxes).map(checkbox => checkbox.value);
        contactosInput.value = contactosSeleccionados.join(", ");
        closeModal('modalContactos');
    };

    const handleDeleteButtonClick = (deleteButton) => {
        deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            if (confirm('¿Está seguro de que desea eliminar esta reunión? Esta acción no se puede deshacer.')) {
                deleteButton.closest('form').submit();
            }
        });
    };

    const handleModifyButtonClick = (modifyButton) => {
        modifyButton.addEventListener("click", () => {
            const id = modifyButton.getAttribute('data-id');
            const asunto = modifyButton.getAttribute('data-asunto');
            const contactos = modifyButton.getAttribute('data-contactos');
            const fecha = modifyButton.getAttribute('data-fecha');
            const hora = modifyButton.getAttribute('data-hora');

            const fechaParts = fecha.split('/');
            const formattedFecha = `${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`;

            const modificarAsunto = document.getElementById('modificarAsunto');
            const modificarContactos = document.getElementById('modificarContactos');
            const modificarFecha = document.getElementById('modificarFecha');
            const modificarHora = document.getElementById('modificarHora');
            const accionId = document.getElementById('accionId');

            if (modificarAsunto && modificarContactos && modificarFecha && modificarHora && accionId) {
                modificarAsunto.value = asunto;
                modificarContactos.value = contactos;
                modificarFecha.value = formattedFecha;
                modificarHora.value = hora;
                accionId.value = id;

                openModal('modificarReunionModal');
            } else {
                console.error("Uno o más elementos del formulario de modificación no se encontraron.");
            }
        });
    };

    checkFormValidity();
    addEventListenersToFields();

    btnAbrirPopup.addEventListener("click", () => openModal('modalContactos'));
    btnSeleccionarContactos.addEventListener("click", handleSeleccionarContactos);

    deleteButtons.forEach(handleDeleteButtonClick);
    modifyButtons.forEach(handleModifyButtonClick);

    cancelarModificar.addEventListener("click", () => closeModal('modificarReunionModal'));

    if (btnAbrirPopupModificar) {
        btnAbrirPopupModificar.addEventListener("click", () => openModal('modalContactos'));
    }
});