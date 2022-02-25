const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const {check, validationResult} = require('express-validator');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, '/index.html'));
})

app.post('/', [
    check('email', 'email is required').not().isEmpty(),
    check('email', 'Email length should be 10 to 30 characters')
                    .isEmail().isLength({ min: 10, max: 30 }),
    check('firstname', 'Firstname is required').not().isEmpty(),
    check('firstname', 'FirstName length should be 3 to 30 characters')
                    .isLength({ min: 3, max: 30 }),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('lastname', 'LastName length should be 3 to 30 characters')
                    .isLength({ min: 3, max: 30 }),
    check('speciality', 'Speciality field is required')
                    .not().isEmpty(),
    check('level', 'Level field is required')
                    .not().isEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({err: true, errors})
    }
    else {
        const participant = {
            email: req.body.email.toLowerCase(),
            firstname: req.body.firstname.toLowerCase(),
            lastname: req.body.lastname.toLowerCase(),
            speciality: req.body.speciality.toLowerCase(),
            level: req.body.level.toLowerCase()
        }
        const data = JSON.parse(fs.readFileSync('data.json'));
        data.participants.push(req.body);
        fs.writeFileSync('data.json', JSON.stringify(data));
        res.redirect('/');
    }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
