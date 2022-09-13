import './App.css';
import useGallery from './hooks/loadGallery';
import Gallery from './components/Gallery';
import { CircularProgress, Grid } from '@mui/material';
import ImageUploadZone from './components/ImageUploadZone';

function App() {
  const [gallery, loading, setGallery] = useGallery();

  return (
    <div className="App">
      {!loading ? (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Gallery gallery={gallery} setGallery={setGallery} /> 
          </Grid>
          <Grid item xs={4}>
            <ImageUploadZone setGallery={setGallery} />
          </Grid>
        </Grid>
      ) : <CircularProgress />}
    </div>
  );
}

export default App;
