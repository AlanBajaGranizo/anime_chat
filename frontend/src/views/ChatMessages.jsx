/* eslint-disable react/prop-types */

import { useEffect } from "react"

function ChatMessages({goku_messages }) {
    useEffect(()=>{
        console.log("se actualizo", goku_messages)
    },[goku_messages])
  return (
    <div className="chat-messages p-4">
    {goku_messages.map((msg,index) =>
      msg.user == "Tu" ? (
        <div
          key={`${msg.user}-${msg.content}-${index}`}
          className="chat-message-right pb-4"
        >
          <div>
            <img
              src="https://bootdey.com/img/Content/avatar/avatar1.png"
              className="rounded-circle mr-1"
              alt="Tu"
              width={40}
              height={40}
            />
          </div>
          <div className="flex-grow-1 bg-light rounded py-2 px-3 mr-3">
            <div className="font-weight-bold mb-1">Tu</div>
            {msg.content}
          </div>
        </div>
      ) : (
        <div
          key={`${msg.user}-${msg.content}-${index}`}
          className="chat-message-left pb-4"
        >
          <div>
            <img
              src="https://i.redd.it/wxb33zg5lk561.jpg"
              className="rounded-circle mr-1"
              alt="Goku"
              width={40}
              height={40}
            />
          </div>
          <div className="flex-grow-1 bg-light rounded py-2 px-3 ml-3">
            <div className="font-weight-bold mb-1">
              {msg.user}
            </div>
            {msg.content}
          </div>
        </div>
      )
    )}
  </div>
  )
}

export default ChatMessages