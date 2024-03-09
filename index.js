const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const UserRouter = require('./routes/UserRoute');
const ProjectRouter = require('./routes/ProjectRoute');
const db = require('./db/db');
const Auth = require('./middleware/Auth');
db();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/user', UserRouter);
app.use('/api/project',[Auth], ProjectRouter);
app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});