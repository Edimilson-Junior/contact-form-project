document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('my-form');
    const inputs = form.querySelectorAll('.input');

    inputs.forEach(input => {
        input.addEventListener('input', () => validarInput(input));
        input.addEventListener('blur', () => validarInput(input));
    });

    function validarInput(input) {
        const mensagemErro = document.querySelector(`#error-${input.id}`);
        
        if (input.validity.valid) {
            input.classList.remove('errorInput');
            mensagemErro.style.display = 'none';
        } else {
            input.classList.add('errorInput');
            mensagemErro.style.display = 'block';
        }
    }

    form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
            e.preventDefault();
            inputs.forEach(validarInput);
        }
    });
});
