import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.scss';
import { useEffect, useState } from 'react';
import { readRemoteFile } from 'react-papaparse'
import axios from 'axios';

const Home = () => {
  
  const processNewsArticles = async (url) => {
    try {
      const request = {
        url: `https://dataset.nlpkit.net:6315/getCsv`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          url
        }
      }

      const response = await axios(request);
      console.log(response.data)
      const data = response.data.data;

      const info = data.map((d, i) => {
        const text = d[4] ? d[3] + "\n" + d[4] + "\n" + d[5] : d[3] + "\n" + d[5]
        return text;
      })

      console.log('info', info)
      setInputText(info)
    } catch(e) {
      console.error(e)
    }
  }

  const inputs = [
    {
      id: 1,
      name: 'NewsArticles.csv',
      value: 'NewsArticles',
      url: 'https://www.michaelcalvinwood.net/datasets/text-data/NewsArticles.csv',
      processor: processNewsArticles
    }
  ]

  const [input, setInput] = useState(inputs[0].value)
  const [output, setOutput] = useState(inputs[0].name)
  const [start, setStart] = useState('0')
  const [tokens, setTokens] = useState('400');
  const [curNum, setCurNum] = useState(Math.floor(Number(start)));
  const [target, setTarget] = useState('');
  const [inputText, setInputText] = useState([]);

  const [stripped, setStripped] = useState([]);

  console.log(tokens)

  const adjustHeight = () => {
    const el = document.getElementById('target');
    const box = el?.getBoundingClientRect()
    const desiredHeight = window.innerHeight - box.top - 8;
    const currentHeight = el?.style.height;
    if (desiredHeight !== currentHeight) el.style.height = desiredHeight + 'px'
  }

  const handleSubmit = () => {
    if (!target) return;
    const request = {
      url: `https://dataset.nlpkit.net:6315/addCsvEntry`,
      method: 'post',
      data: {
        input: inputText[curNum],
        output: target,
        name: output
      }
    }

    console.log(request);
  }

  const newTarget = async origText => {
    setTarget('Loading...');

    try {
      const request = {
        url: `https://dataset.nlpkit.net:6315/getTransformed`,
        method: 'post',
        data: {
          text: origText
        }
      }

      const response = await axios(request);

      setTarget(response.data.transformed);
    } catch(e) {
      console.error(e);
    }
  }

  const getStripped = async () => {
    const response = await axios.get(`https://dataset.nlpkit.net:6315/getSamples`)
    const stripped = response.data;
    setStripped(stripped);
    console.log('stripped', stripped)
  }

  useEffect(() => {
    setTimeout(adjustHeight, 250)
  })

  useEffect(() => {
    const inputSource = inputs.find(inp => inp.value === input);
    inputSource.processor(inputSource.url);

    console.log('new values', inputSource)    
  }, [input])

  useEffect(() => {
    if (inputText[start]) newTarget(inputText[start][0]); else setTarget('');
    setCurNum(start)
  }, [inputText, start])

  useEffect(() => {
    if (inputText[curNum]) newTarget(inputText[curNum]); else setTarget('');
  }, [curNum])

  useEffect(() => {
    getStripped();
  },[])

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
         <IonButton className='Home__submit' onclick={handleSubmit}>Submit</IonButton>
         <IonButton className='Home__submit' fill='outline' onClick={() => setCurNum(s => (Number(s)+1).toString())}>Skip</IonButton>
         <IonTextarea className='Home__target' value={target} onInput={(e) => setTarget(e.target.value)} id='target' rows={27}/>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
