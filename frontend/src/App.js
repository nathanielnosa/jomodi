import Header from './components/Header';
import Footer from './components/Footer';
import NewsLetter from './components/NewsLetter';
import Home from './pages/Home';
import Store from './pages/Store';
import Checkout from './pages/Checkout';

function App() {
  return (
    <div>
      <Header />
      {/* <Store /> */}
      {/* <Checkout /> */}
      <Home />  
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default App;
