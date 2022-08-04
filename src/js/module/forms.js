import { showThanksModal } from "./modal";
import { postData } from "./services";

export default function forms(server) {
    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/icons.svg#spinner',
        success: 'Thank you! We will contact you as soon as possible.',
        failure: 'Something goes wrong'
    };

    forms.forEach(item => {
        bindPostData(item); 
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            postData(`${server}requests`, json)
            .then(response => {
                console.log(response);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => showThanksModal(message.failure))
            .finally(() => form.reset());
        });
    }
}