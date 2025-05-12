import { useState } from "react";
import { searchImages } from "../../api";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import SearchBar from "../SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (newQuery) => {
    if (!newQuery.trim()) return;

    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);

    try {
      setIsLoading(true);
      const data = await searchImages(newQuery, 1);
      setImages(data.results);
    } catch (err) {
      setError("Не вдалося завантажити зображення.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      const nextPage = page + 1;
      const data = await searchImages(query, nextPage);
      setImages((prev) => [...prev, ...data.results]);
      setPage(nextPage);
    } catch (err) {
      setError("Помилка при завантаженні додаткових зображень.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="app">
      <h1>Пошук зображень</h1>

      <SearchBar onSearch={handleSearch} />

      {error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <ImageGallery images={images} onImageClick={setSelectedImage} />

          {isLoading && <Loader />}
          {images.length > 0 && !isLoading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
