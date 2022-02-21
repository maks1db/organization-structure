process.once('SIGUSR2', () => {
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', () => {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, 'SIGINT');
});
