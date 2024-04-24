Nota: 
1. General: Agregar "type": "module", abajo de "main" para exportar express y ocupar los modulos de js 
2. Frontend: npm i socket.io-client
3. Hacer proxy entre server y front en la configuracion de vite: 
 server: {
    proxy: {
      "/socket.io": {
        target: "http://localhost:3000",
        ws: true,  //ws:websocket
      },
    },
  },
