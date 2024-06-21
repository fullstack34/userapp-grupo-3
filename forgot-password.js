document.addEventListener("DOMContentLoaded", () => {
    const fields = document.querySelectorAll("[required]");

    function ValidateField(field) {
        // Lógica para verificar se existem erros
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
                email: {
                    valueMissing: "Email é obrigatório",
                    typeMismatch: "Por favor, preencha um email válido",
                },
                default: {
                    valueMissing: "Por favor, preencha este campo",
                },
            };

            return (messages[field.type] && messages[field.type][typeError]) ? messages[field.type][typeError] : messages.default[typeError];
        }

        function setCustomMessage(message) {
            const spanError = field.parentNode.querySelector("span.error");

            if (message) {
                spanError.classList.add("active");
                spanError.innerHTML = message;
            } else {
                spanError.classList.remove("active");
                spanError.innerHTML = "";
            }
        }

        return function () {
            const error = verifyErrors();

            if (error) {
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

    document.querySelector("form").addEventListener("submit", (event) => {
        event.preventDefault(); // Evita o envio real do formulário para fins de teste

        const email = document.getElementById("email").value;

        // Obter dados salvos no localStorage (simulação)
        const storedData = JSON.parse(localStorage.getItem("userData"));

        if (email && storedData && storedData.email === email) {
            console.log(`Enviar email de recuperação para: ${email}`);

            // Simular envio de email
            alert("Um email de recuperação foi enviado para o seu endereço.");

            // Redirecionar para a página de login após a simulação
            window.location.href = "login.html";
        } else {
            console.log("Email não encontrado ou inválido.");
            const errorSpan = document.querySelector("#email + span.error");
            errorSpan.textContent = "Email não encontrado ou inválido.";
            errorSpan.classList.add("active");
        }
    });
});
