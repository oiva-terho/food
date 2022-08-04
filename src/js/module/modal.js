const dataModal = document.querySelectorAll('[data-modal]');
const modal = document.querySelector('.modal');
const openModalTimer = setTimeout(openModalWindow, 50000);
    window.addEventListener('scroll', showModalByScroll);

function openModalWindow () {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearInterval(openModalTimer);
}
function closeModalWindow () {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}
function showModalByScroll () {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModalWindow();
        window.removeEventListener('scroll', showModalByScroll);
    }
}
function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.style.display = 'none';
    openModalWindow();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.style.display = 'block';
        closeModalWindow();
    }, 4000);
}
export default function modals() {
    dataModal.forEach(item => {
        item.addEventListener('click', openModalWindow);
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {closeModalWindow();}
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display === 'block') {closeModalWindow();}
    });
    
}
    

export { showThanksModal };