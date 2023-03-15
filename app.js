const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  console.log("Access")
});

app.get('/download', (req, res) => {
  const url = req.query.url;
  console.log("Download:"+url)
  try{
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
    ytdl(url, { format: 'mp4' }).pipe(res);
  }catch(e){
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
