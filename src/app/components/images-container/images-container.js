import './images-container.scss';
import { ImageItemComponent } from "../image-item/image-item";

export const ImagesContainerComponent = document.createElement('div');
ImagesContainerComponent.className = 'images-container';
for (let i = 0; i < 10; i++) {
    ImagesContainerComponent.append(new ImageItemComponent().create())
}

dragAndDrop();

function dragAndDrop() {
    let draggedElem;
    
    document.addEventListener('dragstart', (event) => {
        if (event.target.className === 'image-item') {
            draggedElem = event.target;
        }
        if (event.target.className === 'image-item__image') {
            draggedElem = event.target.parentNode;
        }
    }, false);

    document.addEventListener('dragover', (event) => {
        event.preventDefault();
    }, false);

    document.addEventListener('drop', (event) => {
        if (!draggedElem.firstElementChild) return;
        if (event.target === draggedElem || event.target.parentNode === draggedElem) return;
        if (event.target.className === 'image-item' && event.target.firstElementChild) {
            const dropedElem = event.target.firstElementChild.src;
            event.target.firstElementChild.src = draggedElem.firstElementChild.src;
            draggedElem.firstElementChild.src = dropedElem;
            return;
        }
        if (event.target.className === 'image-item__image') {
            const dropedElem = event.target.src;
            event.target.src = draggedElem.firstElementChild.src;
            draggedElem.firstElementChild.src = dropedElem;
            return;
        }
    }, false);
}
