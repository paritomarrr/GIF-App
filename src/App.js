import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

// Constants
const TWITTER_HANDLE = 'tomarpari90';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TEST_GIFS = [
	'https://media.giphy.com/media/3oEjI1erPMTMBFmNHi/giphy.gif',
	'https://media.giphy.com/media/3oEhn8HISbX78FH8L6/giphy.gif',
	'https://media.giphy.com/media/3owvJTMeMnqTruNrZm/giphy.gif',
	'https://media.giphy.com/media/lwdzpYxsi4iJi/giphy.gif',
  'https://media.giphy.com/media/1poV5tPhshE97gw9Df/giphy.gif',
  'https://media.giphy.com/media/3og0IDCumL5GLx7zag/giphy.gif'
]
const App = () => {

  // states
  const [walletAddress, setWalletAddress] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [gifList, setGifList] = useState([])

  // function decides if hantom wallet is connected or not
  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      console.log('Phantom wallet found!')
      // function will allow us to connect directly with user's wallet
      const response = await window.solana.connect({onlyIfTrusted: true});
      console.log('Connected with Public Key: ', response.publicKey.toString())
      setWalletAddress(response.publicKey.toString());
    } else {
      alert('Phantom wallet not found! Get a Phantom wallet');
    }
  }

  const connectWallet = async () => {
    const {solana} = window;
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with public key: ', response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
    }
  }

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log('GIF Link: ', inputValue)
      setGifList([...gifList, inputValue])
      setInputValue('')
    } else {
      console.log('Empty input. Try again!')
    }
  }

  const onInputChange = (e) => {
    const {value} = e.target;
    setInputValue(value)
  }

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <form onSubmit={(e) => {
        e.preventDefault();
        sendGif();
      }}>
        <input type="text" placeholder="Enter GIF Link" value={inputValue} onChange={onInputChange} />
        <button type="submit" className="cta-button submit-gif-button">Submit</button>
      </form>
      <div className="gif-grid">
        {gifList.map(gif => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );
  // render this ui when user hasnt connected to their wallet
  const renderNotConnectedContainer = () => (
    <button className='cta-button connect-wallet-button' onClick={connectWallet}>
      Connect to Wallet
    </button>
  )
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    }
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF List...')
      // solana program here
      // set state
      setGifList(TEST_GIFS)
    } 
  }, [walletAddress])
  return (
    <div className="App">
    {/* This was solely added for some styling fanciness */}
    <div className={walletAddress ? 'authed-container' : 'container'}>
      <div className="header-container">
        <p className="header">🖼GOT GATEWAY</p>
        <p className="sub-text">
          View your GOT collection in the metaverse ✨
        </p>
        {/* Add the condition to show this only if we don't have a wallet address */}
        {!walletAddress && renderNotConnectedContainer()}
        {walletAddress && renderConnectedContainer()}
      </div>
      <div className="footer-container">
        <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
        <a
          className="footer-text"
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
        >{`built on @${TWITTER_HANDLE}`}</a>
      </div>
    </div>
  </div>
  );
};

export default App;
