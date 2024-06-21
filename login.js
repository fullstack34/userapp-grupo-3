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
            text: {
                valueMissing: "Por favor, preencha este campo",
            },
            email: {
                valueMissing: "Email é obrigatório",
                typeMismatch: "Por favor, preencha um email válido",
            },
            senha: {
                valueMissing: "Por favor, preencha este campo",
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

    const emailOrPhone = document.getElementById("emailOrPhone").value;
    const senha = document.getElementById("senha").value;

    // Obter dados salvos no localStorage
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (storedData && storedData.email === emailOrPhone && storedData.senha === senha) {
        console.log("Login bem-sucedido! Redirecionando para o Dashboard...");
        
        // Define a chave "logged-in" como true no localStorage
        localStorage.setItem("logged-in", "true");

        // Redireciona para o dashboard
        window.location.href = "dashboard/dashboard.html";
    } else {
        console.log("Email/telefone ou senha incorretos. Por favor, tente novamente.");
        // Exibir mensagem de erro na tela
        const errorSpan = document.querySelector(".error-message");
        errorSpan.textContent = "Email ou senha inválidos.";
        errorSpan.classList.add("active");

        // Limpar campos de entrada
        document.getElementById("emailOrPhone").value = "";
        document.getElementById("senha").value = "";
    }
});
