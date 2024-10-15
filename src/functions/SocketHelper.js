import socket from "../infrastructure/socket";

const SocketListener = (nameListener, ReduxAction, dispatch) => {
    console.log("SocketListener")

    // Set up the socket listener for incoming data
    socket.on(nameListener, (newPosts) => {
      dispatch(ReduxAction(newPosts)); // Use the new action to set all posts
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


  export {SocketListener}