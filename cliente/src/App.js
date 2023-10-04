import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import StartIcon from '@mui/icons-material/Start';
import axios from "axios";
import Avatar from '@mui/material/Avatar';

const socket = io('http://localhost:5000'); // Conecte-se ao servidor WebSocket

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [tmpName, setTmpName] = useState("");

  const scrollRef = useRef(null);

  useEffect(() => {
    if (messages && messages.length > 0) {
      getSocketMessage();
    } else {
      axios({
        method: "GET",
        url: "http://localhost:8080/mensagem/buscar-mensagens",
      })
        .then((response) => {
          setMessages(response.data);
        })
        .finally(() => {
          getSocketMessage();
        })
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function getSocketMessage() {
    socket.on('chat_message', (data) => {
      setMessages([...messages, data]);
    });
  }

  function handleSubmit(e) {
    if (message !== null && message !== '') {
      const msg = { name: name, message: message, color: color }

      saveMessage(msg);

      e.preventDefault();
      socket.emit('chat_message', msg); // Envie a mensagem para o servidor
      setMessage('')
    }
  };

  function saveMessage(msg){
    axios({
      method: "POST",
      data: msg,
      url: "http://localhost:8080/mensagem/salvar-mensagem",
    })
  }

  function generateColor() {
    let r = parseInt(Math.random() * 240 + 100);
    let g = parseInt(Math.random() * 240 + 100);
    let b = parseInt(Math.random() * 240 + 100);
    return `rgb(${r}, ${g}, ${b})`;
  }

  const changeName = (e) => {
    if (tmpName === 'SERVER') {
      return;
    }

    setColor(generateColor)
    setName(tmpName)

    const msg = { name: 'SERVER', message: `---- USUARIO "${tmpName}" ENTROU NA CONVERSA ----`, color: 'white' }
    saveMessage(msg);
    socket.emit('chat_message', msg);

  };
  function stringAvatar() {
    console.log(name)
    return {
      sx: {
        bgcolor: color,
      },
      children: name.substr(0, 1).toUpperCase(),
    };
  }

  return (
    <div style={{
      height: '100vh',
      backgroundColor: '#1f1f1f',
    }}>
      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        {name ?
          <div>
            <div style={{display: 'flex', alignItems:'baseline', marginTop: 20}}>
              <Avatar 
              {...stringAvatar(name)}  
              style={{marginRight: 10, color: 'black'}}/>
              <p style={{color: 'white'}}>{name}</p>
            </div>
            <div 
              ref={scrollRef}
              style={{ height: 500, width: 800, backgroundColor: '#2f2f2f', marginTop: 20, marginBottom: 20, borderRadius: 10, padding: 20, overflowY: 'scroll' }}>
              {messages.map((msg, index) => (
                <div key={index} style={{ flexDirection: 'row', display: msg.name !== 'SERVER' ? 'flex' : '', textAlign: 'center' }}>
                  {msg.name !== 'SERVER' && <p style={{ color: msg.color, marginRight: 10 }}>{msg.name + ":"}</p>}
                  <p style={{ color: 'white' }}>{msg.message}</p>
                </div>
              ))}
            </div>
            <div>
              <Paper
                component="form"
                onSubmit={handleSubmit}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 830 }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Digite sua mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton aria-label="delete" onClick={handleSubmit} color="primary" sx={{ p: '10px' }} aria-label="directions">
                  <SendIcon />
                </IconButton>
              </Paper>
            </div>
          </div>
          :
          <div>
            <h1 style={{ color: 'white' }}>Escolha um nome de usuario</h1>
            <Paper
              component="form"
              onSubmit={changeName}
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 600 }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Digite seu nome"
                value={tmpName}
                onChange={(e) => setTmpName(e.target.value)}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton aria-label="delete" onClick={changeName} color="primary" sx={{ p: '10px' }} aria-label="directions">
                <StartIcon />
              </IconButton>
            </Paper>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
