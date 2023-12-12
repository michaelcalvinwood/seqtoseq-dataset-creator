import { IonContent, IonHeader, IonInput, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import NewsArticles from '../'
import './Home.scss';
import { useState } from 'react';


const Home: React.FC = () => {
  
  const processNewsArticles = () => {

  }

  const inputs = [
    {
      id: 1,
      name: 'NewsArticles.csv',
      value: 'NewsArticles',
      url: 'https://michaelcalvinwood.net/datasets/text-data/NewsArticles.csv',
      processor: processNewsArticles
    }
  ]

  const [input, setInput] = useState(inputs[0].value)
  const [output, setOutput] = useState(inputs[0].name)


  return (
    <IonPage className='Home'>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='Home__title'>Seq2Seq Dataset Creator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='Home__content'>
          <IonSelect label="Input:" value={input} onIonChange={(e) => setInput(e.detail.value)}>
            {inputs.map(input => {
              return (
                <IonSelectOption key={input.id} value={input.value}>{input.name}</IonSelectOption>
              )
            })

            }
            </IonSelect>
            <IonInput className='Home__output' label="Output:" value={output} onIonInput={(e) => setOutput(e.detail.value)}/>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
