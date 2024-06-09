
import { Provider } from 'react-redux';
import store from '../../Store';
import NavbarTop from './NavbarTop/NavbarTop'
{

}
import 'bootstrap/dist/css/bootstrap.min.css';


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <NavbarTop/>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
