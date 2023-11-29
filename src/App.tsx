import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // VoiceRSS Speech Function
  function tellMe(joke:string) {
    const jokeString = joke.trim().replace(/ /g, '%20');
    // VoiceRSS Speech Parameters
    const audioElement = new Audio();
    audioElement.src = `https://api.voicerss.org/?key=694403e77e334664a88a0ef8a18c5f79&src=${jokeString}&hl=en-us&r=0&c=mp3&f=44khz_16bit_stereo`;
    audioElement.addEventListener('ended', () => {
      setButtonDisabled(false);
    });
    audioElement.play();
  }

  // Get jokes from Joke API
  async function getJokes() {
    setButtonDisabled(true);
    let joke:string = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist';
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      // Assign One or Two Part Joke
      if (data.setup) {
        joke = `${data.setup} ... ${data.delivery}`;
      } else {
        joke = data.joke;
      }
      // Passing Joke to VoiceRSS API
      tellMe(joke);
    } catch (error) {
      // Catch Error Here
    }
  }

  useEffect(() => {
    const button = document.getElementById('button');
    if(button){
      button.addEventListener('click', getJokes);
      return () => {
        button.removeEventListener('click', getJokes);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <button id="button" disabled={buttonDisabled}>
        {buttonDisabled ? 'Telling a Joke...' : 'Tell Me A Joke'}
      </button>
    </div>
  );
}

export default App;