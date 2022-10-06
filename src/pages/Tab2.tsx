import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Tab2.css';
import { IonSearchbar } from '@ionic/react';
import { searchCircle } from 'ionicons/icons';
import { IonButton } from '@ionic/react';

interface ArtistProps {
  name: string;
  url: string;
}
interface ImageProps {
  size: string;
  "#text": string;
}
interface AlbumsProps {
  artist: ArtistProps,
  name: string;
  image: ImageProps[]
}
const Tab2: React.FC = () => {
  const [albums, setAlbums] = useState<AlbumsProps[]>([])
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTopAlbums = async () => {
      const response = await axios.get(
        "http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=rap&api_key=e5e764795cef0f0eda8c964860e21fb8&artist=Cher&album=Believe&format=json"
      );
      setAlbums(response.data.albums.album)
    };
    fetchTopAlbums();


  }, []);

  const searchAlbums = async () => {
    const filterSearch = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${search}&api_key=e5e764795cef0f0eda8c964860e21fb8&format=json`)
    setAlbums(filterSearch.data.results.albummatches.album)
  }
  return (
    <IonPage>
      <IonSearchbar onIonChange={({ target }) => setSearch(target.value!)} animated={true} style={{ zIndex: "9999" }} color="medium" searchIcon={searchCircle} placeholder="Custom Search Icon"></IonSearchbar>
      <IonButton onClick={searchAlbums} style={{ zIndex: "9999" }} color="medium" disabled={!search}>Pesquisar</IonButton>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Albums</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonContent>
          {albums && (
            albums.map(album => {
              return (
                <IonCard className='card'>
                  <img src={album.image[3]['#text']} alt="album cover" />
                  <IonCardHeader>
                    <IonCardSubtitle>{album.artist.name}</IonCardSubtitle>
                    <IonCardTitle>{album.name}</IonCardTitle>

                  </IonCardHeader>
                  <IonCardContent>
                    Artist info
                  </IonCardContent>
                </IonCard>
              )
            })
          )}
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
