const uploadBtn = document.getElementById('uploadBtn');
const downloadBtn = document.getElementById('downloadBtn');
const subjectsContainer = document.getElementById('subjectsContainer');
const uploadSection = document.getElementById('uploadSection');
const downloadSection = document.getElementById('downloadSection');
const backToSubjectsUpload = document.getElementById('backToSubjectsUpload');
const backToSubjectsDownload = document.getElementById('backToSubjectsDownload');
const currentSubjectUpload = document.getElementById('currentSubjectUpload');
const currentSubjectDownload = document.getElementById('currentSubjectDownload');
const fileUpload = document.getElementById('fileUpload');
const downloadList = document.getElementById('downloadList');

const subjectCards = document.querySelectorAll('.subject-card');
let currentMode = '';
let currentSubject = '';

// Mock storage (in a real app, this would be a backend database)
const noteStorage = {};

uploadBtn.addEventListener('click', () => {
    currentMode = 'upload';
    subjectsContainer.style.display = 'grid';
    uploadSection.style.display = 'none';
    downloadSection.style.display = 'none';
});

downloadBtn.addEventListener('click', () => {
    currentMode = 'download';
    subjectsContainer.style.display = 'grid';
    uploadSection.style.display = 'none';
    downloadSection.style.display = 'none';
});

subjectCards.forEach(card => {
    card.addEventListener('click', () => {
        currentSubject = card.dataset.subject;
        subjectsContainer.style.display = 'none';

        if (currentMode === 'upload') {
            uploadSection.style.display = 'flex';
            currentSubjectUpload.textContent = `Upload Notes for ${card.querySelector('.subject-name').textContent}`;
        } else {
            downloadSection.style.display = 'flex';
            currentSubjectDownload.textContent = `Download Notes for ${card.querySelector('.subject-name').textContent}`;
            updateDownloadList();
        }
    });
});

backToSubjectsUpload.addEventListener('click', () => {
    uploadSection.style.display = 'none';
    subjectsContainer.style.display = 'grid';
});

backToSubjectsDownload.addEventListener('click', () => {
    downloadSection.style.display = 'none';
    subjectsContainer.style.display = 'grid';
});

fileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            noteStorage[currentSubject] = noteStorage[currentSubject] || [];
            noteStorage[currentSubject].push(reader.result);
            alert('Notes uploaded successfully!');
        };
        reader.readAsDataURL(file);
    }
});

function updateDownloadList() {
    downloadList.innerHTML = '';
    const notes = noteStorage[currentSubject] || [];
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.className = 'download-item';
        li.innerHTML = `<span>Note ${index + 1}</span><button onclick="downloadNote(${index})">Download</button>`;
        downloadList.appendChild(li);
    });
}

function downloadNote(index) {
    const note = noteStorage[currentSubject][index];
    const a = document.createElement('a');
    a.href = note;
    a.download = `note${index + 1}.pdf`;
    a.click();
}
