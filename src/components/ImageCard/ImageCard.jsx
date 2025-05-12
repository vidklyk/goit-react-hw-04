import css from "./ImageCard.module.css";

export default function ImageCard({ image }) {
  const { alt_description, urls } = image;

  return (
    <img
      className={css.image}
      src={urls.small}
      alt={alt_description || "Image"}
    />
  );
}
