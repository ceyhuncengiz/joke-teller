const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}
// Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'aafacdcbb9c346d19fc675341dc32f1b',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke  = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist'
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.setup) {
          joke = `${data.setup} ... ${data.delivery}`;
      } else {
          joke = data.joke;
      }
      // Text-to-Speech
      tellMe(joke);
      // Disable Button
      toggleButton();
    } catch(error) {
        // Catch Errors Here
        console.log('whoops', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

