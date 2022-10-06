import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Tab2.css';
import { IonSearchbar } from '@ionic/react';
import { searchCircle } from 'ionicons/icons';
import { IonButton } from '@ionic/react';
import { API_KEY } from '../consts/API';

interface ImageProps {
  size: string;
  "#text": string;
}

interface ArtistProps {
  name: string;
  url: string;
  image: ImageProps[]
  listeners: number;
}

interface SingleArtist {
  name: string;
  url: string;
  image: ImageProps[]
  listeners: number;
  bio?: { content: string };
}
const Tab3: React.FC = () => {
  const [artist, setArtist] = useState<ArtistProps[]>([])
  const [singleArtist, setSingleArtist] = useState<SingleArtist>();
  const [search, setSearch] = useState('');
  const [chageArtist, setchangeArtist] = useState(false);
  useEffect(() => {
    const fn = async () => {
      const response = await axios.get(
        "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=e5e764795cef0f0eda8c964860e21fb8&format=json"

      );
      setArtist(response.data.artists.artist)

    };
    fn();
  }, []);

  const searchAlbums = async () => {
    const filterSearch = await axios.get(` http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${search}&api_key=${API_KEY}&format=json`)
    console.log(filterSearch)
    setchangeArtist(true);
    setSingleArtist(filterSearch.data.artist)
  }
  return (
    <IonPage>
      <IonSearchbar onIonChange={({ target }) => setSearch(target.value!)} animated={true} style={{ zIndex: "9999" }} color="medium" searchIcon={searchCircle} placeholder="Custom Search Icon"></IonSearchbar>
      <IonButton onClick={searchAlbums} style={{ zIndex: "9999" }} color="medium" disabled={!search}>Pesquisar</IonButton>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Artistas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonContent>{
          !chageArtist ? artist && (
            artist.map(artist => {
              return (
                <IonCard className='card'>
                  <img src={artist.image[3]['#text']} alt="artist cover" />
                  <IonCardHeader>
                    <IonCardSubtitle>{ }</IonCardSubtitle>
                    <IonCardTitle>{artist.name}</IonCardTitle>

                  </IonCardHeader>
                  <IonCardContent>
                    {`Listeners: ${artist.listeners}`}
                  </IonCardContent>
                </IonCard>
              )
            })) : singleArtist && (
              <IonCard className='card'>
                <img src={singleArtist.image[3]['#text']} alt="singleArtist cover" />
                <IonCardHeader>
                  <IonCardSubtitle>{ }</IonCardSubtitle>
                  <IonCardTitle>{singleArtist.name}</IonCardTitle>

                </IonCardHeader>
                <IonCardContent>
                  {`Info: ${singleArtist.bio?.content}`}
                </IonCardContent>
              </IonCard>
            )}

        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
