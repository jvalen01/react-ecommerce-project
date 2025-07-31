import "./NotFoundPage.css";
import { Header } from '../../components/Header';

export function NotFoundPage({ cart }) {
  return (
    <div className="error-container">
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <Header cart={cart}/>

      <p className="error-message">This page doesnt exist</p>
    </div>
  );
}
