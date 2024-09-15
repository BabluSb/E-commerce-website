const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 3000; 


app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.post('/classify-feedback', async (req, res) => {
    const feedback = req.body.feedback;
    console.log('Received feedback:', feedback); // Log feedback to console

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: `Classify the following feedback into Positive, Neutral, or Negative: ${feedback}` }
            ],
            max_tokens: 10
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const classification = response.data.choices[0].message.content.trim();
        res.json({ classification });
    } catch (error) {
        res.status(500).send('Error classifying feedback');
    }
});

// Default route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
