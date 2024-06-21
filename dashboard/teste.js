document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#addressForm");
    const fields = form.querySelectorAll("[required]");

    function ValidateField(field) {
        function verifyErrors() {
            let foundError = false;

            for (let error in field.validity) {
                if (field.validity[error] && !field.validity.valid) {
                    foundError = error;
                    break;
                }
            }
            return foundError;
        }

        function customMessage(typeError) {
            const messages = {
                cep: {
                    valueMissing: "CEP é obrigatório",
                    patternMismatch: "Por favor, preencha um CEP válido",
                    tooShort: "O CEP deve conter no mínimo 8 caracteres"
                },
                rua: {
                    valueMissing: "Rua é obrigatória",
                },
                numero: {
                    valueMissing: "Número é obrigatório",
                },
                bairro: {
                    valueMissing: "Bairro é obrigatório",
                },
                cidade: {
                    valueMissing: "Cidade é obrigatória",
                },
                uf: {
                    valueMissing: "UF é obrigatória",
                },
                default: {
                    valueMissing: "Por favor, preencha este campo",
                },
            };

            return (messages[field.name] && messages[field.name][typeError]) ? messages[field.name][typeError] : messages.default[typeError];
        }

        function setCustomMessage(message) {
            const errorElement = field.parentNode.querySelector(`#${field.id}-error`);

            if (message) {
                errorElement.textContent = message;
                errorElement.classList.add("active");
            } else {
                errorElement.textContent = "";
                errorElement.classList.remove("active");
            }
        }

        return function () {
            const error = verifyErrors();

            if (error === "patternMismatch" && field.type === "text" && field.name === "cep") {
                setCustomMessage(customMessage("tooShort"));
            } else if (error) {
                const message = customMessage(error);
                field.style.borderColor = "red";
                setCustomMessage(message);
            } else {
                field.style.borderColor = "green";
                setCustomMessage();
            }
        };
    }

    function customValidation(event) {
        const field = event.target;
        const validation = ValidateField(field);
        validation();
    }

    for (const field of fields) {
        field.addEventListener("invalid", (event) => {
            event.preventDefault();
            customValidation(event);
        });
        field.addEventListener("blur", customValidation);
    }

    form.addEventListener("submit", (event) => {
        const formFields = form.querySelectorAll("[required]");
        let isValid = true;

        formFields.forEach((field) => {
            const validation = ValidateField(field);
            validation();

            if (!field.validity.valid) {
                isValid = false;
            }
        });

        if (!isValid) {
            event.preventDefault();
            console.log("Formulário inválido. Corrija os erros antes de enviar.");
        } else {
            // Salvar dados no localStorage
            const formData = {
                cep: document.getElementById('cep').value,
                rua: document.getElementById('rua').value,
                numero: document.getElementById('numero').value,
                complemento: document.getElementById('complemento').value,
                bairro: document.getElementById('bairro').value,
                cidade: document.getElementById('cidade').value,
                uf: document.getElementById('uf').value
            };
            localStorage.setItem('addressData', JSON.stringify(formData));
            console.log("Dados salvos no localStorage:", formData);
        }
    });

    // Máscara para campo de CEP (XXXXX-XXX)
    const cepInput = document.getElementById('cep');
    cepInput.addEventListener('input', function (e) {
        let value = e.target.value;
        value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
        value = value.replace(/^(\d{5})(\d)/, '$1-$2'); // Adiciona a máscara
        e.target.value = value;
    });

});
