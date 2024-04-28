const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/register-user', (req, res) => {
    const { username, password } = req.body;

    // Read existing users from users.json
    fs.readFile('public/users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Failed to register user.' });
        }

        let users = JSON.parse(data);
        users.push({ username, password });

        // Write updated users back to users.json
        fs.writeFile('public/users.json', JSON.stringify(users), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Failed to register user.' });
            }

            res.status(200).json({ success: true, message: 'User registered successfully.' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
