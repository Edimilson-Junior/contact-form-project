document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('my-form');
    const inputs = form.querySelectorAll('.input');
    const radios = form.querySelectorAll('input[name="query"]')
    const successMessage = document.getElementById('success-message');

    inputs.forEach(input => {
        input.addEventListener('input', () => validarInput(input));
        input.addEventListener('blur', () => validarInput(input));
    });

    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            validarQueryType();
            // Adicionar/remover classe de seleção
            document.querySelectorAll('.query').forEach(div => {
                div.classList.remove('selected-query');
            });
            if (radio.checked) {
                radio.closest('.query').classList.add('selected-query');
            }
        });
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

    function validarQueryType() {
        const mensagemErro = document.getElementById('error-query-type');
        const peloMenosUmSelecionado = [...radios].some(radio => radio.checked);
        
        if (peloMenosUmSelecionado) {
            mensagemErro.style.display = 'none';
            radios.forEach(radio => {
                radio.closest('.query').classList.remove('errorInput');
            });
        } else {
            mensagemErro.style.display = 'block';
            radios.forEach(radio => {
                radio.closest('.query').classList.add('errorInput');
            });
        }
    }

    form.addEventListener('submit', (e) => {
        let formIsValid = form.checkValidity();
        validarQueryType(); // Forçar validação dos radios
        
        if (!formIsValid || document.getElementById('error-query-type').style.display === 'block') {
            e.preventDefault();
            inputs.forEach(validarInput);
        } else {
            e.preventDefault();
            // Esconder formulário e mostrar mensagem de sucesso
            successMessage.style.display = 'block';
            
            // Recarregar a página após 3 segundos
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    });
});