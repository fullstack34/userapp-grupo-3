// cep-api.js

document.addEventListener("DOMContentLoaded", function() {
    const cepInput = document.getElementById("cep");

    cepInput.addEventListener("blur", function() {
        const cep = cepInput.value.replace(/\D/g, '');
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById("rua").value = data.logradouro;
                        document.getElementById("bairro").value = data.bairro;
                        document.getElementById("cidade").value = data.localidade;
                        document.getElementById("uf").value = data.uf;
                    } else {
                        alert("CEP não encontrado.");
                    }
                })
                .catch(error => {
                    console.error("Erro ao buscar CEP:", error);
                    alert("Erro ao buscar CEP. Tente novamente mais tarde.");
                });
        } else {
            alert("Formato de CEP inválido.");
        }
    });
});
