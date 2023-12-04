const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

mongoose.connect('mongodb://127.0.0.1:27017/Gonggan', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

app.get('/styles.css', (req, res) => {
    res.sendFile(__dirname + '/styles.css', { headers: { 'Content-Type': 'text/css' } });
});

app.post('/signup', async (req, res) => {
    try {
        const { username, email, password, birthdate } = req.body; // birthdate 추가
        const newUser = new User({ username, email, password, birthdate }); // birthdate 추가
        await newUser.save();
        res.send('회원가입이 완료되었습니다.');
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('회원가입 중 오류가 발생했습니다.');
    }
});

wss.on('connection', (ws) => {
    console.log('WebSocket 연결이 생성되었습니다.');
    
    ws.on('message', (message) => {
        console.log(`서버가 메시지를 수신했습니다: ${message}`);
    });

    ws.on('close', () => {
        console.log('WebSocket 연결이 종료되었습니다.');
    });
});

server.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
