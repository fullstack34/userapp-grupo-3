
document.addEventListener("DOMContentLoaded", function() {
    const menuHTML = `
        <div class="dashboard">
            <div class="menu-bar">
                <div class="logo">
                    <a href="https://fullstack34.github.io/userapp-grupo-3/dashboard.html" style="color: white; text-decoration: none;">BikEletric</a>
                </div>
                <div class="menu">
                    <ul>
                        <li><a href="https://fullstack34.github.io/userapp-grupo-3/dashboard/cep.html">Cadastrar endereço</a></li>
                        <li><a href="https://fullstack34.github.io/userapp-grupo-3/dashboard/address-list.html">Listar endereços</a></li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    document.getElementById("menu-container").innerHTML = menuHTML;
});
