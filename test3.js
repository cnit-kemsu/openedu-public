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

  socket.write('EHLO kemsu.ru\r\n');
  console.log((await socket.reply).toString());

  socket.write('STARTTLS\r\n');
  console.log((await socket.reply).toString());
  const socket1 = await socket.toTLS(options);
  //const socket1 = socket;
  console.log('tls started');
  socket1.write('EHLO 176.196.206.136\r\n');
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
  socket1.write(`Message-ID: <8a1232c7-8bc3-8447-c766-72d89af19958@kemsu.ru>\r\n`);
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

        socket1.write(`Content-Type: text/html; charset=utf-8\r\n\r\n`);
        socket1.write(`${html}\r\n`);

      socket1.write(`--alternative_boundary\r\n`);

        socket1.write(`Content-Type: image/jpeg; name=send1.jpeg\r\n`);
        //socket1.write(`Content-Disposition: image1.png\r\n`);
        //socket1.write(`Content-Disposition: attachment; filename=send1.jpg; size=4658; creation-date="Mon, 14 Oct 2019 07:21:33 GMT"; modification-date="Mon, 14 Oct 2019 07:21:33 GMT"\r\n`);
        socket1.write(`Content-Disposition: inline; filename=send1.jpeg\r\n`);  
        socket1.write(`Content-ID: <send1>\r\n`);
        socket1.write(`Content-Transfer-Encoding: base64\r\n\r\n`);
        socket1.write(`${sendFile.toString('base64')}\r\n`);
        // socket1.write(`/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/
        // 2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwM
        // BwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM
        // DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAOABkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEA
        // AAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJx
        // FDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNk
        // ZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJ
        // ytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQF
        // BgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMz
        // UvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3
        // eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna
        // 4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDtPhvrz+AvgT4M8Pv8YPDPw0+Kng37Xp97
        // 4o1rwRaaj/Zx02UxpGuoGRLdopLYMkCyxOwWGdfMjb96/wBM6/p8n7ZHws0jUviB4oisdJ8Fam1t
        // aTyraaJcQSwFljlmuY/38U01rJFIxsr2GMi6ZRGyfM35IfDz4L+G9P0OXwnr3iPxhaeKdbt4TOml
        // wxSaKsSu6RrIpkjluPmDvj93tLKqngs31Fffs1Xmi/B7xZq2qa/qGrap4L0TTdbaH7QLaw1WyeYa
        // fOsixRLcRyxuLfyxFcIHjU73Vh8+U4zhVvSvKL25mtHZdktNHpbrv2qljKNWboSdpx10XS77vzW7
        // vp6H0de/tR+E/hX8ftC8I+B9Nm8M6xGt8dUvPFdzLptrrwJixfxTXckt1dKJIpY0ADzSPLIEVmVi
        // Pcv+Fq6t/wBFg+Ev/gyl/wDiK8B+FX/BKP4ofFj4S+Jh4J+I3gfRIdW+xWfiDwjrXhddS0LxAhsb
        // a+t2mnJ8/csN5bsXZXmS4iLrN8oZvjn/AIdl/GD/AKBvwL/8Guv/AONP2FRzbavttt+aZ1c1JKyd
        // vXV/kf/Z\r\n`);

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
  //await send('alt1.gmail-smtp-in.l.google.com', 'johncooper87tom@gmail.com');
  await send('alt1.gmail-smtp-in.l.google.com', 'johnxcooper87@gmail.com');
  //await send('mxs.mail.ru', 'johncooper87@mail.ru');

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

      <img src="cid:send1" />
      <div style="color: red">123 asd</div>

    </body>
  </html>
`;