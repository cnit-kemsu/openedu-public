const net = require('net');
const tls = require('tls');

function createReply(read, resolved) {
  let resolve, reject;

  return {
    data: new Promise((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    }),
    resolve,
    reject,
    read,
    resolved
  };
}

class Socket {

  static connect(host, port) {
    return new Promise((resolve, reject) => {

      const socket = net.connect(port, host, () => {
        socket.removeAllListeners('error');
        resolve(new Socket(socket));
      });
      socket.on('error', error => reject(error));
      
    });
  }

  static tls_connect(host, port, options) {
    return new Promise((resolve, reject) => {

      const socket = tls.connect(port, host, options, () => {
        socket.removeAllListeners('error');
        resolve(new Socket(socket));
      });
      socket.on('error', error => reject(error));
      
    });
  }

  constructor(socket) {
    /**@type {net.Socket} */
    this._socket = socket;

    this._replies = [];

    this._socket.on('data', data => {

      if (this._replies.length !== 0 && this._replies[0].read) {
        this._replies[0].resolve(data);
        this._replies.shift();
      } else {
        const reply = createReply(false, true);
        reply.resolve(data);
        this._replies.push(reply);
      }

    });

    this._socket.on('error', error => {
      
      if (this._replies.length !== 0 && this._replies[0].read) {
        this._replies[0].reject(error);
        this._replies.shift();
      } else {
        const reply = createReply(false, true);
        reply.reject(error);
        this._replies.push(reply);
      }

    });
  }

  toTLS(options) {
    return new Promise((resolve, reject) => {

      const socket = tls.connect({ socket: this._socket, ...options }, () => {
        socket.removeAllListeners('error');
        resolve(new Socket(socket));
      });
      socket.on('error', error => reject(error));
      
    });
  }

  write(data, encoding) {
    return new Promise((resolve, reject) => {

      this._socket.write(data, encoding, error => {
        if (error != null) reject(error);
        else resolve();
      });

      console.log(data);
      
    });
  }

  get reply() {
    let reply;
    if (this._replies.length !== 0 && this._replies[0].resolved) {
      reply = this._replies.shift();
    } else {
      reply = createReply(true, false);
      this._replies.push(reply);
    }
    return reply.data;
  }
}

const fs = require('fs');

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('public-cert.pem'),
  rejectUnauthorized: false
};

const sendFile = fs.readFileSync('send.jpg');

async function send(host, to, from = 'info-openedu@kemsu.ru') {

  const socket = await Socket.connect(host, 25);
  console.log((await socket.reply).toString());

  socket.write('EHLO bondarev.kemsu.ru\r\n');
  console.log((await socket.reply).toString());

  socket.write('STARTTLS\r\n');
  console.log((await socket.reply).toString());
  const socket1 = await socket.toTLS(options);
  console.log('tls started');
  socket1.write('EHLO bondarev.kemsu.ru\r\n');
  console.log((await socket1.reply).toString());

  socket1.write(`MAIL FROM: <${from}>\r\n`);
  console.log((await socket1.reply).toString());

  socket1.write(`RCPT TO: <${to}>\r\n`);
  console.log((await socket1.reply).toString());

  socket1.write('DATA\r\n');
  console.log((await socket1.reply).toString());


  socket1.write(`From: ЦИФРИУМ <${from}>\r\n`);
  socket1.write(`To: John Cooper <${to}>\r\n`);
  //socket1.write(`X-Image-URL: openedu.kemsu.ru/5023e29bac8a17815f5013aec595e444.png\r\n`);
  socket1.write(`Subject: Testing\r\n`); // one more \r\n
  //socket1.write(`Views: Text, Html\r\n`);
  socket1.write(`MIME-Version: 1.0\r\n`);
  //socket1.write(`Content-Type:multipart/mixed; boundary="mixed_boundary"\r\n`);
  //socket1.write(`--mixed_boundary\r\n`);

    socket1.write(`Content-Type:multipart/mixed; boundary="alternative_boundary"\r\n`);
    socket1.write(`--alternative_boundary\r\n`);

      // socket1.write(`Content-Type:multipart/related; boundary="related_boundary"\r\n`);
      // socket1.write(`--related_boundary\r\n`);

        //socket1.write(`Content-Type: text/html; charset=utf-8\r\n`);
        //socket1.write(`Content-Transfer-Encoding: 8bit\r\n`);
        // socket1.write(`<!DOCTYPE html>
        //   <head>
        //       <meta charset="utf-8">
        //       <title></title>
        //   </head>
        //   <html>
        //     <body>
        //       <p style="color: red">Hello!</p>
        //       <img src="cid:0123456789">
        //       <p>This is a message</p>
        //     </body>
        //   </html>
        // \r\n`);

        socket1.write(`Content-Type: text/html; charset=utf-8\r\n`);
        socket1.write(`${html}\r\n`);

      socket1.write(`--alternative_boundary\r\n`);

        socket1.write(`Content-Type: image/png; name="image1.png"\r\n`);
        socket1.write(`Content-Disposition: image1.png\r\n`);
        socket1.write(`Content-Disposition: attachment; filename="image1.png"; size=4658; creation-date="Mon, 14 Oct 2019 07:21:33 GMT"; modification-date="Mon, 14 Oct 2019 07:21:33 GMT"\r\n`);
        socket1.write(`Content-ID: <image1.png>\r\n`);
        socket1.write(`Content-Transfer-Encoding: base64\r\n`);
        socket1.write(`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\r\n`);

      //socket1.write(`--related_boundary--\r\n`);

    socket1.write(`--alternative_boundary--\r\n`);

  //socket1.write(`--mixed_boundary--\r\n`);
  socket1.write(`\r\n.\r\n`);
  console.log((await socket1.reply).toString());

  socket1.write(`QUIT\r\n`);
  console.log((await socket1.reply).toString());

  
  // let reply = '';
  // do {
  //   reply = (await socket.reply).toString();
  //   console.log(reply);
  //   console.log('111');
  // } while (true);
}

async function test() {
  await send('alt1.gmail-smtp-in.l.google.com', 'johnxcooper87@gmail.com');
  await send('mxs.mail.ru', 'johncooper87@mail.ru');

  process.exit();
}

test();


const html = `<!DOCTYPE html>
  <html>
    <head>

      <title></title>
      <style>
      </style>

    </head>
    <body>

      <img src="cid: image1.png" />
      <div style="color: red">123 asd</div>

    </body>
  </html>
`;