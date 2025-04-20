const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const port = 3000;
app.use(express.json());

const SECRET_KEY = 'good'; // для access token
const REFRESH_KEY = 'bad'; // для refresh token
app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: 'Alice', role: 'user' },
  { id: 2, name: 'Bob', role: 'moderator' },
  { id: 3, name: 'admin', role: 'admin' },
  { id: 4, name: 'AcmeOrg', role: 'organization', verified: true }
];

app.post('/api/auth/login', (req, res) => {
  const user = users.find(u => u.name === req.body.name);
  user ? res.json(user) : res.status(404).json({ error: 'User not found' });
});
// Измененный эндпоинт для получения роли пользователя
app.get('/api/auth/role', authenticateToken, (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = users.find(u => u.name === decoded.email); // или u.email, в зависимости от структуры
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ role: user.role });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.post('/api/moderator/approve-event', (req, res) => {
  res.json({ message: 'Event approved' });
});

app.post('/api/moderator/verify-org', (req, res) => {
  res.json({ message: 'Org verified' });
});

app.delete('/api/moderator/delete-user/:id', (req, res) => {
  res.json({ message: `User ${req.params.id} deleted` });
});

app.post('/api/org/create-event', (req, res) => {
  res.json({ message: 'Event created' });
});

app.post('/api/org/post-news', (req, res) => {
  res.json({ message: 'News posted' });
});

app.post('/api/admin/assign-moderator', (req, res) => {
  res.json({ message: 'Moderator assigned' });
});
app.post('/register/organization', (req, res)=>{
  const { email, password, nameOfOrg, file } = req.body;
  console.log(email);
  console.log(password);
  console.log(nameOfOrg);
  console.log(file);

});
const NewsList = [{
      id: 1,
      title: 'новоо событий',
      imageUrl: '/assets/imgs/cardImage.png',
      text: 'Вкусная еда и музыка',
      date: '2025-04-15',
    },
    {
      id: 2,
      title: 'новость номер 2',
      imageUrl: '/assets/imgs/cardImage.png',
      text: 'здесь буелт текст',
      date: '2025-04-20',
    },
    {
      id: 3,
      title: 'новость номер 2',
      imageUrl: '/assets/imgs/cardImage.png',
      text: 'здесь буелт текст',
      date: '2025-04-20',
    }, {
      id: 4,
      title: 'новость номер 2',
      imageUrl: '/assets/imgs/cardImage.png',
      text: 'здесь буелт текстsdkfskddjnfdjksjfgajvdjvajbdhvlkjavhsdfsdhbfsjkfbsaflkjsdbfhjsbfjsfhjsdfshfbshfbshjlfbhjl',
      date: '2025-04-20',
    }]
app.get('/api/news/moderation', (req, res) =>{
  res.json(NewsList)
});
// Статичный список событий
const eventList = [
  {
    id: 1,
    title: 'Фестиваль еды',
    coords: [55.751244, 37.618423],
    imageUrl: '/assets/imgs/cardImage.png',
    description: 'Вкусная еда и музыка',
    offline: true,
    date: '2025-04-15',
    category:'Еда'

  },
  {
    id: 2,
    title: 'Выставка искусств',
    coords: [55.760241, 37.622838],
    imageUrl: '/assets/imgs/cardImage.png',
    description: 'Современное искусство',
    offline: true,
    date: '2025-04-20',
    category: 'Искусство'
  },
  {
  	id: 3,
    title: 'хуйня ебаная',
    coords: [51.760241, 33.622838],
    imageUrl: '/assets/imgs/cardImage.png',
    description: 'параша конченная не приходите сюда',
    offline: false,
    date: '2025-04-22',
    category: 'Андерграунд'
  }
];
const popularEvents = [
{
  id: 12331,
    title: 'Фестиваль еды японии и северной кореи',
    coords: [39.0292426, 125.6597109],
    imageUrl: '/assets/imgs/cardImage.png',
    description: 'Вкусная еда и музыка',
    offline: true,
    date: '2025-06-30',
    category:'Еда'
},
{
   id: 123,
    title: 'Экскурсия в Гулаг',
    coords: [39.0292426, 85.6597109],
    imageUrl: '/assets/imgs/cardImage.png',
    description: 'Историяфыввдыолфрофивофтывмирфвофы ивопфываифрв',
    offline: true,
    date: '2025-06-30',
    category:'История'
}];
const profile = {
   id: 1, 
    email:'admin@gmail.com', 
    name:'dadas',
    avatarUrl: '',
    role: 'admin',
};
app.get('/api/profile', (req, res) =>{
  res.json(profile);
});
const orgModerate = [
{
  id: 1,
  nameOfOrg : 'Phoenix',
  email:'mane@gmail.com',
  linkToFile: 'https://drive.google.com/file/d/1DJIxSONSuBN38EL65QBZ-jtepUOEYwNU/view?usp=drive_link',
  status: false,
  logoUrl : '/assets/imgs/cardImage.png'
},
{
  id: 2,
  nameOfOrg:'JG',
  email: 'jg@gmail.com',
  linkToFile: 'https://drive.google.com/file/d/1DJIxSONSuBN38EL65QBZ-jtepUOEYwNU/view?usp=drive_link',
  status: false
}]
app.get('/api/org/verification', (req, res) => {
  res.json(orgModerate);
});
// GET запрос для получения всех событий
app.get('/events', (req, res) => {
  res.json(eventList);
});

app.get('/popularEvents', (req, res) => {
  res.json(popularEvents);
});
const multer = require('multer');
const upload = multer();

app.post('/auth', upload.none(), (req, res) => {
  const { email, password } = req.body;

  console.log('email:', email); // теперь увидишь значения

  if (email === 'admin@gmail.com' && password === 'admin') {
    const accessToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: '15m' });
    return res.json({ access_token: accessToken });
  } else {
    const refreshToken = jwt.sign({ email: email || 'unknown' }, REFRESH_KEY, { expiresIn: '7d' });
    return res.json({ refresh_token: refreshToken });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // добавляем декодированные данные пользователя в запрос
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
}

// Заглушка API для подписки на мероприятие
app.post('/api/events/subscribe', authenticateToken, (req, res) => {
  const { eventId } = req.body;
  console.log(`Пользователь записался на мероприятие: ${eventId}`);

  // Можно тут сделать вставку в БД
  res.json({ success: true, message: `Вы записаны на мероприятие ${eventId}` });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
