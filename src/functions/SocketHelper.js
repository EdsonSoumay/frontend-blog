import socket from "../infrastructure/socket";

const SocketListenerGlobal = (nameListener, ReduxAction, dispatch) => {

    // Set up the socket listener for incoming data
    socket.on(nameListener, (data) => {
      dispatch(ReduxAction(data)); // Use the new action to set all posts
    });

    // Listener for connection errors
    socket.on('connect_error', (err) => {
      console.error("Connection Error:", err);
    });

    // Listener for general socket errors
    socket.on('error', (err) => {
      console.error("Socket Error:", err);
    });

    // Listener for disconnections
    socket.on('disconnect', (reason) => {
      console.log(`Socket disconnected: ${reason}`);
    });
  }


  const SocketListenerRoom = (nameRoom, nameListener, ReduxAction, dispatch) => {
    // Emit untuk bergabung ke room
    socket.emit('joinRoom', nameRoom);

    // Mendengarkan event dari room jika telah join ke room
    socket.on(nameListener, (data) => {
      console.log('Data dari room :', data);
      dispatch(ReduxAction(data)); // Use the new action to set all posts
    });

    // Jika ada error saat koneksi
    socket.on('connect_error', (err) => {
      console.log('Connection error:', err);
    });

    // Saat menerima pesan umum dari event 'response'
    socket.on('response', (data) => {
      console.log('Received message from room:', data);
      // Lakukan sesuatu dengan pesan, misalnya update state atau render
    });

    // Saat socket terputus
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  
    // Return instance socket untuk digunakan di luar fungsi
    return socket;
  }

  export {SocketListenerGlobal, SocketListenerRoom}