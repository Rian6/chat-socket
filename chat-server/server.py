import socketio
import eventlet

sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio)

@sio.event
def connect(sid, data, environ):
    print(environ)
    print(f"Cliente conectado: {data}")

@sio.event
def disconnect(sid):
    print(f"Cliente desconectado: {sid}")

@sio.event
def chat_message(sid, data):
    print(f"Mensagem recebida: {data}")
    sio.emit('chat_message', data)

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 5000)), app)
