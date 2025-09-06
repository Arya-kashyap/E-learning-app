import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AuthProvider } from './context/AuthProvider.jsx'
const stripePromise = loadStripe("pk_test_51RRpvXBAqhwV7ucuJMTzRNWWOOEtgjyTHsLFuwbsy2vHfUu5dxJwUWW1M9pk0todGJ3eRpkrWpsNUgFT5RBCq2lo00jc3UoCST");

createRoot(document.getElementById('root')).render(

  <Elements stripe={stripePromise}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </Elements>
)
