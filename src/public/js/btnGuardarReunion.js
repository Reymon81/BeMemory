document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formReuniones");
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