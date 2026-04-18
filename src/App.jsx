import './App.css';
import Message from './Message';
import { useState } from 'react';
import { Button } from '@mui/material';

function App() {
  let [messages, setMessages] = useState([]);
  let [loading, setLoading] = useState(false);

  async function fetchResponse(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      const prompt = formJson.prompt
      let response = await fetch('http://localhost:8000/ask', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: prompt })
      });
      const data = await response.json();
      setMessages([...messages, { prompt: prompt, response: data }]);
      setLoading(false);
    } catch (ex) {
      setMessages([...messages, { prompt: 'Fetching info...', response: ex.message }]);
      console.log(ex);
    }
  }
  return (
    <div className="App">
      <h1>Hi, I’m Usama 👋</h1>
      <div className='messageContainer'>
        {
          messages.map((message) => {
            return (
              <>
                <Message prompt={message.prompt} />
                <Message response={message.response} />
              </>
            );
          })
        }
        <Button style={{display: loading ? "block" : "None"}} loading variant="outlined">
          Submit
        </Button>
      </div>
      <form method='POST' className="prompt-container" onSubmit={fetchResponse}>
        <input name='prompt' placeholder='Ask me Anything!' required='true' />
        <button className='promptBtn' type='submit'>Send</button>
      </form>
    </div>
  )
}

export default App
