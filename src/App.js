import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

// Constants
const TWITTER_HANDLE = 'tomarpari90';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  // states
  const [walletAddress, setWalletAddress] = useState(null)

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
  return (
    <div className="App">
    {/* This was solely added for some styling fanciness */}
    <div className={walletAddress ? 'authed-container' : 'container'}>
      <div className="header-container">
        <p className="header">🖼 GIF Portal</p>
        <p className="sub-text">
          View your GIF collection in the metaverse ✨
        </p>
        {/* Add the condition to show this only if we don't have a wallet address */}
        {!walletAddress && renderNotConnectedContainer()}
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
