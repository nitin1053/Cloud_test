const express = require('express');
const app = express();
const port = 80;

app.get('/sayHello', (req, res) => {
  res.json({ message: "Hello User" });
});

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
