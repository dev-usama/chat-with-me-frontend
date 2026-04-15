import './App.css';
import Message from './Message';
import { useState } from 'react';

function App() {
  let [messages, setMessages] = useState([]);

  async function fetchResponse(e) {
    e.preventDefault();
    try {
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      const prompt = formJson.prompt
      console.log("Prompt:", prompt)
      let response = await fetch('http://localhost:8000/ask', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: prompt })
      });
      const data = await response.json();
      setMessages([...messages, { prompt: prompt, response: data }]);
    } catch (ex) {
      setMessages([...messages, { prompt: 'Fetching info...', response: ex.message }]);
      console.log(ex);
    }
  }
  return (
    <div className="App">
      <h1>Ask Me Anything</h1>
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
      </div>
      <form method='POST' className="prompt-container" onSubmit={fetchResponse}>
        <input name='prompt' />
        <button className='promptBtn' type='submit'>Send</button>
      </form>
    </div>
  )
}

export default App
