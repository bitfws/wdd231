export default function cookies() {
  const botones = document.querySelectorAll('#cookies-btns');

  botones.forEach((boton) => {
    boton.addEventListener('click', function () {
      const valor = boton.getAttribute('data-value');

      if (valor === 'Accept All') {
        localStorage.setItem('cookiesAccepted', 'true');
      } else if (valor === 'Reject All') {
        localStorage.setItem('cookiesAccepted', 'false');
      }

      const cookiesDiv = document.getElementById('cookies');
      if (cookiesDiv) {
        cookiesDiv.style.display = 'none';
      }
    });
  });
}
