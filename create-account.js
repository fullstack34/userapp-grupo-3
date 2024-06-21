document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#createAccountForm");
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
                nome: {
                    valueMissing: "Campo obrigatório.",
                },
                sobrenome: {
                    valueMissing: "Campo obrigatório.",
                },
                email: {
                    valueMissing: "Campo obrigatório.",
                    typeMismatch: "Por favor, insira um endereço de e-mail válido.",
                },
                senha: {
                    valueMissing: "Campo obrigatório.",
                },
                confirmar_senha: {
                    valueMissing: "Campo obrigatório.",
                    mismatch: "As senhas não coincidem."
                },
                default: {
                    valueMissing: "Campo obrigatório.",
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

            if (field.name === "confirmar_senha" && field.value !== form.querySelector("#senha").value) {
                setCustomMessage(customMessage("mismatch"));
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
        event.preventDefault(); // Evita o envio real do formulário

        const isValid = Array.from(fields).every(field => {
            const validation = ValidateField(field);
            validation();
            return field.validity.valid;
        });

        if (!isValid) {
            console.log("Formulário inválido. Corrija os erros antes de enviar.");
            return;
        }

        // Salvar os dados no localStorage
        const formData = new FormData(form);
        const user = {};
        formData.forEach((value, key) => {
            user[key] = value;
        });
        localStorage.setItem("userData", JSON.stringify(user));

        // Redireciona para a página de login
        window.location.href = "/login.html";
    });
});
