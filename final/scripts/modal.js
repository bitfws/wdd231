export default function modal(data){

    
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    modal.showModal();

    modalContent.innerHTML = `
    <img src=${data.image_url} alt="GitHub logo" loading="lazy">
    <hr>
    <p>${data.name}</p>
    `
    
    
    const closeModal = document.querySelector('.close');
    closeModal.addEventListener('click', (e) => {
        modal.close();
    });


}