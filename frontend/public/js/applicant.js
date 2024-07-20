const $applicationTypes = document.getElementById('applicationTypes');
const $applicationTypeTemplate = document.getElementById('applicationTypeTemplate');
const $name = document.getElementById('name');
const $email = document.getElementById('email');
const $submitBtn = document.getElementById('submitBtn');
const $applyModalAlert = document.getElementById('applyModalAlert');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

let applicationTypeId;

$submitBtn.addEventListener('click', () => {
    const name = $name.value;
    const email = $email.value;
    $name.classList.remove('is-invalid');
    $email.classList.remove('is-invalid');
    if (!name.trim()) {
        $name.classList.add('is-invalid');
        return;
    }
    if (!email.trim() || !emailRegex.test(email)) {
        $email.classList.add('is-invalid');
        return;
    }
    apply(name, email);
});

getApplicationTypes();

function getApplicationTypes() {
    fetch('http://localhost:8080/api/applicationTypes/list.php')
        .then(response => response.json())
        .then(data => {
            $applicationTypes.innerHTML = '';
            data.forEach(type => {
                const clone = $applicationTypeTemplate.content.cloneNode(true);
                clone.querySelector('.card-title').innerText = type.title;
                clone.querySelector('.card-text').innerText = type.description;
                clone.querySelector('.applyBtn').addEventListener('click', () => {
                    applicationTypeId = type.id;
                });
                $applicationTypes.appendChild(clone);
            });
        });
}

function apply(name, email) {
    $applyModalAlert.classList.add('d-none');
    fetch('http://localhost:8080/api/applicants/create.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${name}&email=${email}&application_type_id=${applicationTypeId}`
    })
    .then(() => {
        window.location.reload();
    })
    .catch(() => {
        $applyModalAlert.classList.remove('d-none');
    });
}