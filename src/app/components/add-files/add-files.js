import addFiles from './add-files.html';
import './add-files.scss';

export const AddFilesComponent = document.createElement('div');
AddFilesComponent.className = 'add-files-container';
AddFilesComponent.innerHTML = addFiles;

const input = AddFilesComponent.querySelector('#input');
input.addEventListener('change', handlerImage);

const exit = AddFilesComponent.querySelector('.add-files-exit');
exit.addEventListener('click', () => {
    if (AddFilesComponent.querySelector('.add-files__content').style.display === '') {
        AddFilesComponent.querySelector('.add-files__content').style.display = 'none';
        exit.style.transform = 'rotate(45deg)';
    } else {
        AddFilesComponent.querySelector('.add-files__content').style.display = '';
        exit.style.transform = 'rotate(90deg)';
    }
});

AddFilesComponent.addEventListener('drop', (event) => {
    event.preventDefault();
    let files = event.dataTransfer.files;
    handlerImage(null, files);
}, false);

function handlerImage(event, files) {
    const progress = document.querySelector('.progress-container');
    progress.style.display = 'flex';
    let images;
    let amount = 0;
    if (event) {
        images = event.target.files;
    } else {
        images = files;
    }
    
    reader();
    
    function reader() {
        if(amount > images.length) {
            setTimeout(() => {
                progress.style.display = 'none';
            }, 0);
            return;
        }
        progress.firstElementChild.innerHTML = 'Загрузка ' +
        Math.floor(amount / images.length * 100) + ' %';
        
        let image = images[amount];
        if (image) {
            if (image.size > 32000000) return;
            const reader = new FileReader();
            reader.readAsDataURL(image);
            
            reader.onload = (e) => {
                createImages(e.target.result);
            }
        }
        amount++;
        return setTimeout(() => {
            reader();
        }, 0);
    }
}

function createImages(url) {
    const imgElement = document.createElement('img');
    imgElement.className = 'image-item__image';
    imgElement.draggable = false;

    let previousSrc = '';
    let currentSrc = url;
    
    const imageItems = document.querySelectorAll('.image-item');
    const existImages = document.querySelectorAll('.image-item__image');

    for (let i = 0; i < existImages.length + 1; i++) {
        if (imageItems[i]) {
            const imageItem = imageItems[i].querySelector('.image-item__image');
            if (imageItem) {
                previousSrc = imageItem.src;
                imageItem.src = currentSrc;
                currentSrc = previousSrc;
            } else {
                if (i === 0) {
                    imgElement.src = currentSrc;
                } else {
                    imgElement.src = previousSrc;
                }
                imageItems[i].append(imgElement);
            }
        }
    }
}
