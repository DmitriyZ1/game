const express = require('express');
const app = express();
const PORT = process.env.PORT || 4010

const root = require('path').join(__dirname);
app.use(express.static(root));
app.get("*", (req, res) => {
   res.sendFile('index.html', {
      root
   });
});


app.listen(PORT);

console.log('App is listening on port ' + PORT);