var uuid = require("uuid");
const axios = require('axios')

let messages = [];

const addMessage = (room, name, message, userid) => {  
  const msg = { id: uuid.v4(), room, name, message, userid };
  messages.push(msg);  
}; 

const removeMessage = (id) => {
  const index = messages.findIndex((message) => message.id === id);

  if (index !== -1) return messages.splice(index, 1)[0];
};


const removeAllRoomMessages = (room) => {
  messages = messages.filter((message) => message.room !== room)
}

const getMessage = (id) => messages.find((message) => message.id === id);

const getMessagesInRoom = (room) =>
  messages.filter((message) => message.room === room);

const saveMessagesDB = async (room) => {          
  try {
    const messages =  await axios.post('https://onledu-back-end.onrender.com/api/chat/saveMessagesDB', {
      messages: getMessagesInRoom(room)
    })
    if (messages)
      removeAllRoomMessages(room)
    
    return messages
  } catch (err) {
      console.error(err)
  }
}


module.exports = { addMessage, removeMessage, getMessage, getMessagesInRoom, saveMessagesDB };