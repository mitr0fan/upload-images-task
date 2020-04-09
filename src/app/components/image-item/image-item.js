import imageItemHtml from './image-item.html';
import './image-item.scss';

export class ImageItemComponent {
    create() {
        const imageItemComponent = document.createElement('div');
        imageItemComponent.className = 'image-item';
        imageItemComponent.innerHTML = imageItemHtml;
        return imageItemComponent;
    }
}
