import './images-container.scss';
import { ImageItemComponent } from "../image-item/image-item";

export const ImagesContainerComponent = document.createElement('div');
ImagesContainerComponent.className = 'images-container';
for (let i = 0; i < 10; i++) {
    ImagesContainerComponent.append(new ImageItemComponent().create())
}
