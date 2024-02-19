import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [video, setVideo] = useState(null);
  const [allVideos, setAllVideos] = useState([]);

  let env = import.meta.env;

  useEffect(() => {
    getVideos();
  }, []);

  const handleVideoUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("video", video);

    await axios.post("http://localhost:3000/videos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const handleChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const getVideos = async () => {
    const result = await axios.get("http://localhost:3000/videos");
    setAllVideos(result.data.data);
  };

  return (
    <>
      <h1>Subir video</h1>
      <form onSubmit={handleVideoUpload}>
        <input
          type="file"
          accept="video/*"
          name="video"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {allVideos.length > 0 ? (
        allVideos.map((data, index) => {
          return (
            <video key={index} controls>
              <source
                src={`${env.VITE_URL_BE}/videos/${data.video}`}
                type="video/mp4"
              />
            </video>
          );
        })
      ) : (
        <p>No hay videos para mostrar</p>
      )}
    </>
  );
}

export default App;
