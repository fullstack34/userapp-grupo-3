// auth.js

// Função para verificar se o usuário está logado
function checkLoggedIn() {
    const loggedIn = localStorage.getItem("logged-in");

    if (!loggedIn || loggedIn !== "true") {
        // Se não estiver logado, redireciona para a página de login
        window.location.href = "/login.html";
    }
}

// Verifica o status de login ao carregar qualquer página
document.addEventListener("DOMContentLoaded", () => {
    checkLoggedIn();
});
