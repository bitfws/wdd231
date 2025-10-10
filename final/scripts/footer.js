export default function footer() {
  document.getElementById(
    'currentyear'
  ).textContent = `© Hiking and Trail Exploration ${new Date().getFullYear()}`;
  document.getElementById(
    'lastModified'
  ).textContent = `Last Modification: ${document.lastModified}`;
}
