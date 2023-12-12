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
  const [start, setStart] = useState('0')
  const [tokens, setTokens] = useState('400');
  const [curNum, setCurNum] = useState(Math.floor(Number(start)))


  return (
    <IonPage className='Home'>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='Home__title'>Seq2Seq Dataset Creator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{backgroundColor: 'var(ion-color-secondary) !important'}}>
        <div className='Home__content'>
         <div className="Home__settings">
          <div className="Home__input-container">
              <IonSelect className='Home__input' label="Input:" value={input} onIonChange={(e) => setInput(e.detail.value)}>
                {inputs.map(input => {
                  return (
                    <IonSelectOption key={input.id} value={input.value}>{input.name}</IonSelectOption>
                  )
                })

                }
                </IonSelect>
                <IonInput className='Home__start' label="Start:" type="number" min="0" value={start} 
                  onIonInput={(e) =>  {
                    setStart(e.detail.value)
                    setCurNum(Math.floor(Number(e.detail.value)))
                  } }
                />
            </div>
            <div className="Home__output-container">
              <IonInput className='Home__output' label="Output:" value={output} onIonInput={(e) => setOutput(e.detail.value)}/>
              <IonInput className='Home__tokens' label="Tokens:" type="number" min="100" value={tokens} onIonInput={(e) => setTokens(e.detail.value) }/>
            </div>
         </div>
         <div className='Home__curnum'>{curNum}</div>
            
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
