const http = require('http');

const port = process.env.PORT || 3000;

const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [
    { color: 'blue' },
    { size: 'XL' },
  ],
};

http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(product));
}).listen(port, () => {
  console.log(`Server start at port ${port}`);
});
