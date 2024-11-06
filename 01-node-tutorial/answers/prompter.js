const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let guess = "Guess a number between 0 and 10";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.

const form = () => {
  return `
  <body>
  <style>
  .button{
    background-color: #04AA6D;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }
  </style>
  <p>${guess}</p>
  <form method="POST">
  <input name="guess" type="number"></input>
  <button class="button" type="submit" .background-color=>Guess</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      const myNum = Math.floor(Math.random() * 11)
      const num = Number.parseInt(body["guess"])
      console.log(num)
      console.log(myNum)
      if (num < myNum) {
        guess = `Too low, the number was ${myNum}`;
      } else if (num > myNum) {
        guess = `Too high, the number was ${myNum}`;
      } else if (num === myNum ) {
        guess = "You got it!"
      } else {
        guess = "What?"
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
