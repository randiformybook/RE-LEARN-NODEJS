// Hapus Flash Message after 3 seconds
setTimeout(() => {
  const flashMessage = document.querySelectorAll(
    ".flash-message, .delete-message"
  );
  flashMessage.forEach((msg) => {
    if (msg) msg.style.display = "none";
  });
}, 3000);
