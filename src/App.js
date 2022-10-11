import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { useEffect } from 'react';

// Constants
const TWITTER_HANDLE = 'tomarpari90';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  // wallet connection
  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      console.log('Phantom wallet connected!')
      const response = await window.solana.connect({onlyIfTrusted: true});
      console.log('Connected with public key:', response.publicKey.toString())
    } else {
      alert('Solana object not found! Get a Phantom Wallet')
    }
  }

  const connectWallet = async () => {};

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onload);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
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
