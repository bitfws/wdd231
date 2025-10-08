export default function congratulations() {
  const params = new URLSearchParams(window.location.search);
  const submitedData = document.getElementById('submited-data')

const message = `We will contact you soon <b>${params.get('firstName')} ${params.get('lastName')}</b>.`

  submitedData.innerHTML = message;
}