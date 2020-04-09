import addFiles from './add-files.html';
import './add-files.scss';

export const AddFilesComponent = document.createElement('div');
AddFilesComponent.className = 'add-files-container';
AddFilesComponent.innerHTML = addFiles;

const input = AddFilesComponent.querySelector('#input');
input.addEventListener('change', handlerImage);

function handlerImage(event) {
    const image = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.onprogress = (e) => {
        console.log(e.total);
    }

    reader.onload = (e) => {
        console.log(e);
    }
}
