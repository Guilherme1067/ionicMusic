import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import './Tab1.css';
import { Storage } from '@ionic/storage'
import { useHistory } from "react-router-dom";



const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string | number>("");
  const [password, setPassword] = useState<string | number>("");
  const [name, setName] = useState<string | number>("");
  const store = new Storage();
  let history = useHistory();

  useEffect(() => {
    const initialeStorage = async () => {
      await store.create()
    }
    initialeStorage()
  }, [store])

  const setStorage = async () => {
    await store.set("email", email)
    await store.set("password", password)
    history.push("/")
  }
  return (
    <IonPage >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cadastro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent  >
        <form onSubmit={(e) => {
          e.preventDefault();
          setStorage()

        }} style={{ marginTop: "250px" }} >
          <IonList>
            <IonItem>
              <IonInput required onIonChange={({ target }) => setName(target.value!)} type="text" placeholder="User name"></IonInput>
            </IonItem>
            <IonItem>
              <IonInput required onIonChange={({ target }) => setEmail(target.value!)} type="email" placeholder="email@domain.com"></IonInput>
            </IonItem>
            <IonItem>
              <IonInput required onIonChange={({ target }) => setPassword(target.value!)} type="password" placeholder="Type your password"></IonInput>
            </IonItem>
          </IonList>
          <div style={{ marginTop: "10px" }}>
            <IonButton type="submit" color="light" expand="block">Cadastrar</IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>

  );
};

export default SignUp;
