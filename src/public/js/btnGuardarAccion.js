document.addEventListener('DOMContentLoaded', function() {
    const contacto = document.getElementById('contacto');
    const accion = document.getElementById('accion');
    const fecha = document.getElementById('fecha');
    const guardarBtn = document.getElementById('guardarBtn');

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