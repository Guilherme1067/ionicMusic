import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Tab1.css';
import { Storage } from '@ionic/storage';
import { useHistory } from 'react-router';

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
  const [email, setEmail] = useState<string | number>("");
  const [password, setPassword] = useState<string | number>("");

  const store = new Storage();
  let history = useHistory();

  useEffect(() => {
    const initialeStorage = async () => {
      await store.create()
    }
    initialeStorage()
  }, [store])

  const handleLogin = async () => {
    const registeredEmail = await store.get("email",)
    const registeredPassword = await store.get("password")
    if (password === registeredPassword && registeredEmail === email) {
      history.push("/tab2")
    }
    else {
      alert("dados incorretos")
    }
  }

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
    <IonPage >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent  >
        <form onSubmit={(e) => {
          e.preventDefault();
          handleLogin()
        }} style={{ marginTop: "250px" }} >
          <IonList>
            <IonItem>
              <IonInput onIonChange={({ target }) => setEmail(target.value!)} type="email" placeholder="email@domain.com"></IonInput>
            </IonItem>
            <IonItem>
              <IonInput onIonChange={({ target }) => setPassword(target.value!)} type="password" placeholder="Type your password"></IonInput>
            </IonItem>
          </IonList>
          <div style={{ marginTop: "10px" }}>
            <IonButton color="light" expand="block" type="submit">Login</IonButton>
            <IonButton href='/signUp' color="light" expand="block">Cadastrar</IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>

  );
};

export default Tab1;
