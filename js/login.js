const loginForm = document.querySelector("#loginForm");

const emailCorreto = "admin@gmail.com";
const senhaCorreta = "admin123";

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    const mensagem = document.querySelector("#mensagem");

    if (email === emailCorreto && senha === senhaCorreta) {

        mensagem.textContent = "Login realizado com sucesso!";
        mensagem.style.color = "#284d2f";

        setTimeout(() => {
            window.location.href = "admin.html";
        }, 800);

    } else {

        mensagem.textContent = "Redirecionando...";
        mensagem.style.color = "#ed7440";

        setTimeout(() => {
            window.location.href = "adocao.html";
        }, 800);

    }

});