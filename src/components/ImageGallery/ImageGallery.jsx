import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ images, onImageClick }) {
  if (!images.length) return null;

  return (
    <ul className={css.gallery}>
      {images.map((img) => (
        <li key={img.id} className={css.item}>
          <div onClick={() => onImageClick(img)}>
            <ImageCard image={img} />
          </div>
        </li>
      ))}
    </ul>
  );
}
