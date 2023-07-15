import Header from './components/Header';
import Footer from './components/Footer';
import NewsLetter from './components/NewsLetter';
import Home from './pages/Home';
import Store from './pages/Store';
import Checkout from './pages/Checkout';
import Product from './pages/Product';

function App() {
  return (
    <div>
      <Header />
      <Product />
      {/* <Store /> */}
      {/* <Checkout /> */}
      {/* <Home />   */}
      <NewsLetter />
      <Footer />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// Add the script references
const scriptSources = [
  'js/jquery.min.js',
  'js/bootstrap.min.js',
  'js/slick.min.js',
  'js/nouislider.min.js',
  'js/jquery.zoom.min.js',
  'js/main.js',
];

scriptSources.forEach((src) => {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
});

export default App;
