import "./index.css";
import ReactDOM from 'react-dom/client'
import App from './App'
import { createClient, Provider } from "urql";

const GRAPHQL_ENDPOINT =
  "https://kc2i6rqidfamdby4uc7nwk7siq.appsync-api.us-east-1.amazonaws.com/graphql";

const client = createClient({
  url: GRAPHQL_ENDPOINT,
  fetchOptions: () =>{
    return {
        headers: {
      "x-api-key": "da2-532jrqzvxrfcvkawio6f2xoqem",
      "content-type": "application/json"
    }}
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider value={client}>
    <App />
  </Provider>,
)
