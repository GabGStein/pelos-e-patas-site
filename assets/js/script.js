let cadastro_validator = {
    handleSubmit: (event) => {
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        cadastro_validator.clearErrors()

        for(let i=0; i<inputs.length;i++) {
            let input = inputs[i];
            let check = cadastro_validator.checkInput(input);
            if (check !== true) {
                send = false;
                cadastro_validator.showError(input, check);
            }
        }


        if(send) {
            form.submit();
        }
    },

    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null) {
            let rDetails = rules.split('=');
                switch(rDetails[0]) {
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return 'Campo tem que ter pelo menos '+rDetails[1]+' caracteres'
                        }
                    break;
                    case 'age':
                        const hoje = new Date()
                        const nascimento = new Date(input.value + 'T00:00:00')

                        let idade = hoje.getFullYear() - nascimento.getFullYear();
                        let mes = hoje.getMonth() - nascimento.getMonth();

                        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
                            idade--;
                        }

                        if (idade < 18) {
                            return 'Você precisa ter mais de 18 anos'
                        }
                    break;
            }
        }

        return true
    },

    showError: (input, error) => {
        input.style.borderColor = '#ff0000'

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error

        input.parentElement.insertBefore(errorElement, input.ElementSibling)
    },
    clearErrors: () => {

        let inputs = form.querySelectorAll('input');
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0; i < errorElements.length; i++) {
            errorElements[i].remove()
        }
    }
}

let form = document.querySelector('.cadastro_form');

form.addEventListener('submit', cadastro_validator.handleSubmit)