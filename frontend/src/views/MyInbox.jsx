import "./../styles/MyInbox.css";
import { useState} from "react";
import ChatMessages from "./ChatMessages";
import OpenAI from "openai";
function MyInbox() {
  // Create New State
  const [goku_messages, set_gk_messages] = useState([
   
    {
      user: "Goku",
      content: "Hola soy Goku",
    },
  ]);



  const openai = new OpenAI({apiKey: "YOUR API KEY", dangerouslyAllowBrowser: true});

  async function prompt(cont) {
    const completion = await openai.chat.completions.create({
      
      messages: [  {"role": "system", "content": "¡Hey, chicos! ¿Qué tal? Soy Gokú ¡Me alegro de verlos! ¿Listos para otra aventura?"},
      {"role": "user", "content": "Sí, claro ¿Quieres comer algo?"},
      {"role": "system", "content": "¡Me muero de hambre! ¿Cuándo vamos a comer?"},
      {"role": "user", "content": "Después de entrenar juntos"},
      {"role": "system", "content": "¡Eso suena genial! Entrenar juntos me dará aún más hambre. ¡Vamos a hacerlo!"},
      {"role": "user", "content": cont}],
      model:"ft:gpt-3.5-turbo-0125:personal:goku2:96rKiPC5",
    });
    const answer = completion?.choices[0]?.message?.content ?? "error"
    return answer
}


  const handleSendMessage = async () => {
    const inputs = document.getElementsByClassName("chat-box");
    const msg = inputs[0]?.value ?? "error"
    const newmsg ={
      user: "Tu",
      content: msg,
    };
    
    set_gk_messages([...goku_messages, newmsg]);
    inputs[0].value = null
    const answer = await prompt(msg)
    
    set_gk_messages([...goku_messages,newmsg,  {"user":"Goku", "content":answer}]);
  };

  return (
    <div>
      <main className="content" style={{ marginTop: "150px" }}>
        <div className="container p-0">
          <h1 className="h3 mb-3">Messages</h1>
          <div className="card">
            <div className="row g-0">
            
              <div className="col-12 ">
                <div className="py-2 px-4 border-bottom d-none d-lg-block">
                  <div className="d-flex align-items-center py-1">
                    <div className="position-relative">
                      <img
                        src="https://i.redd.it/wxb33zg5lk561.jpg"
                        className="rounded-circle mr-1"
                        alt="Goku"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="flex-grow-1 pl-3">
                      <strong>Goku</strong>
                      <div className="text-muted small">
                        <em>Online</em>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-primary btn-lg mr-1 px-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-phone feather-lg"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </button>
                      <button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-video feather-lg"
                        >
                          <polygon points="23 7 16 12 23 17 23 7" />
                          <rect
                            x={1}
                            y={5}
                            width={15}
                            height={14}
                            rx={2}
                            ry={2}
                          />
                        </svg>
                      </button>
                      <button className="btn btn-light border btn-lg px-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-more-horizontal feather-lg"
                        >
                          <circle cx={12} cy={12} r={1} />
                          <circle cx={19} cy={12} r={1} />
                          <circle cx={5} cy={12} r={1} />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="position-relative">
                 <ChatMessages goku_messages={goku_messages}></ChatMessages>
                </div>
                <div className="flex-grow-0 py-3 px-4 border-top">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control chat-box"
                      placeholder="Type your message"
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handleSendMessage}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyInbox;
