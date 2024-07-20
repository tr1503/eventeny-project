const $applicationTypes = document.getElementById('applicationTypes');
const $title = document.getElementById('title');
const $description = document.getElementById('description');
const $createBtn = document.getElementById('createBtn');
const $createApplicationTypeModalAlert = document.getElementById('createApplicationTypeModalAlert');
const $applicationTypeTemplate = document.getElementById('applicationTypeTemplate');
const $applicantTemplate = document.getElementById('applicantTemplate');
const $viewApplicationTypeModal = document.getElementById('viewApplicationTypeModal');

$createBtn.addEventListener('click', () => {
    const title = $title.value;
    const description = $description.value;
    $title.classList.remove('is-invalid');
    if (!title.trim()) {
        $title.classList.add('is-invalid');
        return;
    }
    createApplicationType(title, description);
});

getApplicationTypes();

$viewApplicationTypeModal.addEventListener('show.bs.modal', event => {
    const $viewBtn = event.relatedTarget;
    const applicationTypeId = $viewBtn.getAttribute('data-application-type-id');
    getApplicants(applicationTypeId);
});

function createApplicationType(title, description) {
    $createApplicationTypeModalAlert.classList.add('d-none');
    fetch('http://localhost:8080/api/applicationTypes/create.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `title=${title}&description=${description}`
    })
    .then(() => {
        window.location.reload();
    })
    .catch(() => {
        $createApplicationTypeModalAlert.classList.remove('d-none');
    });
}

function getApplicationTypes() {
    fetch('http://localhost:8080/api/applicationTypes/list.php')
        .then(response => response.json())
        .then(data => {
            $applicationTypes.innerHTML = '';
            data.forEach(type => {
                const clone = $applicationTypeTemplate.content.cloneNode(true);
                clone.querySelector('.card-title').innerText = type.title;
                clone.querySelector('.card-text').innerText = type.description;
                clone.querySelector('.viewBtn').setAttribute('data-application-type-id', type.id);
                $applicationTypes.appendChild(clone);
            });
        });
}

function getApplicants(applicationTypeId) {
    fetch(`http://localhost:8080/api/applicants/list.php?application_type_id=${applicationTypeId}`)
    .then(response => response.json())
    .then(data => {
        const $applicants = document.getElementById('applicants');
        $applicants.innerHTML = '';
        data.forEach(applicant => {
            const clone = $applicantTemplate.content.cloneNode(true);
            const $switch = clone.querySelector('.form-check-input');
            const $label = clone.querySelector('.form-check-label');
            $switch.id = `switch${applicant.id}`;
            $switch.setAttribute('data-applicant-id', applicant.id);
            $switch.checked = applicant.status === 'Waitlist' ? false : true;
            $switch.addEventListener('change', event => {
                updateApplicantStatus(event.target.getAttribute('data-applicant-id'), $switch.checked);
            });
            $label.setAttribute('for', `switch${applicant.id}`);
            $label.innerText = applicant.name;
            $applicants.appendChild(clone);
        });
    });
}

function updateApplicantStatus(applicantId, status) {
    fetch('http://localhost:8080/api/applicants/update-status.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `applicant_id=${applicantId}&status=${status ? 'Approved' : 'Waitlist'}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status !== '200') {
            throw Error('Something wrong!');
        }
    })
    .catch(error => console.error('Error:', error));
}
