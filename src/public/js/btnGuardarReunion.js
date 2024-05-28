document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formReuniones");
    const submitButton = document.getElementById("btnGuardar");

    const checkFormValidity = () => {
        const isFormValid = form.checkValidity();
        submitButton.disabled = !isFormValid;
    };

    const fields = form.querySelectorAll("input, select, textarea");
    fields.forEach(field => {
        field.addEventListener("input", checkFormValidity);
        field.addEventListener("change", checkFormValidity);
    });

    // Llama a checkFormValidity al cargar la página para asegurar que el botón está correctamente deshabilitado si los campos no están completos
    checkFormValidity();

    // Maneja el botón "Seleccionar" del modal
    const btnSeleccionar = document.getElementById("btnAbrirPopup");

    btnSeleccionar.addEventListener("click", () => {
        $('#modalContactos').modal('show'); // Abre el modal al hacer clic en "Seleccionar"
    });

    // Maneja el botón "Seleccionar" del modal de contactos
    const btnSeleccionarContactos = document.getElementById("btnSeleccionar");

    btnSeleccionarContactos.addEventListener("click", () => {
        const contactosCheckboxes = document.querySelectorAll("#formListaContactos input[type='checkbox']:checked");
        const contactosInput = document.getElementById("contactos");
        const contactosSeleccionados = Array.from(contactosCheckboxes).map(checkbox => checkbox.value);
        contactosInput.value = contactosSeleccionados.join(", ");
        $('#modalContactos').modal('hide'); // Cierra el modal después de seleccionar los contactos
    });
});

