const express = require("express");
const ytdl = require("ytdl-core");
const request = require("request");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
  console.log("Access");
});

app.get("/download", (req, res) => {
  var id = req.query.url
  id = id.replace(/\s+/g, "");
  if(id){
    var op = {
      url: "https://www.youtube.com/shorts/"+id,
      method: "GET",
    };
    request(op, function (error, response, body) {
      if (response.statusCode == 200) {
        console.log("Download:" + id);
        res.header("Content-Disposition", 'attachment; filename="video.mp4"');
        ytdl(id, { format: "mp4" }).pipe(res);
      }else{
        console.log("Error:"+id);
        res.sendFile(__dirname + "/views/error.html");
      }
    });
  }else{
    console.log("Error");
        res.sendFile(__dirname + "/views/error.html");
  }
  
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
