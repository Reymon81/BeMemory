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