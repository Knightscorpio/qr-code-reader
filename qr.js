const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const resultDiv = document.getElementById('result');

navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(error => {
    console.error('Error accessing video:', error);
  });

video.addEventListener('play', function() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  requestAnimationFrame(tick);
});

function tick() {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  qrcode.decodeFromImage(canvas).then(result => {
    if (result) {
      resultDiv.textContent = result;
    }
  }).catch(error => {
    console.error('Error decoding QR code:', error);
  });
  requestAnimationFrame(tick);
}