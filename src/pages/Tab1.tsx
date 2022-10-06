import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Tab2.css';

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
const Tab1: React.FC = () => {
  const [albums, setAlbums] = useState<AlbumsProps[]>([])
  useEffect(() => {
    const fn = async () => {
      const response = await axios.get(
        "http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=rap&api_key=e5e764795cef0f0eda8c964860e21fb8&artist=Cher&album=Believe&format=json"
      );
      setAlbums(response.data.albums.album)
    };
    fn();
  }, []);
  return (
    <IonPage>
      <IonSearchbar />
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

export default Tab1;
