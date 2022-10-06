import React from 'react';
import { IonSearchbar } from '@ionic/react';
import { searchCircle } from 'ionicons/icons';

export const SearchBar = () => {
  return (
    <>
      <IonSearchbar animated={true} style={{ zIndex: "9999" }} color="medium" searchIcon={searchCircle} placeholder="Custom Search Icon"></IonSearchbar>
    </>
  );
}