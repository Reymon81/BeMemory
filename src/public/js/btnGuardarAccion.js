document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formAcciones');
    const guardarBtn = document.getElementById('guardarBtn');
    const contacto = form.querySelector('input[name="contacto"]');
    const accion = form.querySelector('input[name="accion"]');
    const fecha = form.querySelector('input[name="fecha"]');

    function checkForm() {
        if (contacto.value && accion.value && fecha.value) {
            guardarBtn.disabled = false;
        } else {
            guardarBtn.disabled = true;
        }
    }

    contacto.addEventListener('input', checkForm);
    accion.addEventListener('input', checkForm);
    fecha.addEventListener('input', checkForm);
});

document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.querySelector('input[name="contacto"]');
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