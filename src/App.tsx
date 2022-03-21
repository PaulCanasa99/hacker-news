import './App.css';
import Stories from './components/Stories';
import HackerNewsLogo from './assets/hacker-news@2x.png';
const App = () => {

  return (
    <>
      <div className='header'>
        <img src={HackerNewsLogo} alt='Hacker News Logo'/>
      </div>
      <Stories/>
    </>
  );
}

export default App;
