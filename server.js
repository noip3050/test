const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// قراءة الأسئلة من ملف JSON
const readQuestions = () => {
    if (fs.existsSync('questions.json')) {
        const data = fs.readFileSync('questions.json');
        return JSON.parse(data);
    }
    return [];
};

// حفظ الأسئلة في ملف JSON
const saveQuestions = (questions) => {
    fs.writeFileSync('questions.json', JSON.stringify(questions, null, 2));
};

// إضافة سؤال جديد
app.post('/add-question', (req, res) => {
    const { text, options, correctAnswer } = req.body;

    const questions = readQuestions();
    const newQuestion = { id: questions.length, text, options, correctAnswer }; // إضافة id
    questions.push(newQuestion);
    saveQuestions(questions);

    res.status(201).send('تمت إضافة السؤال بنجاح!');
});

// عرض جميع الأسئلة
app.get('/questions', (req, res) => {
    const questions = readQuestions();
    res.json(questions);
});

// عرض سؤال محدد
app.get('/questions/:id', (req, res) => {
    const questions = readQuestions();
    const question = questions.find(q => q.id == req.params.id);
    if (question) {
        res.json(question);
    } else {
        res.status(404).send('السؤال غير موجود.');
    }
});

// تحديث سؤال محدد
app.put('/questions/:id', (req, res) => {
    const questions = readQuestions();
    const questionIndex = questions.findIndex(q => q.id == req.params.id);

    if (questionIndex !== -1) {
        const updatedQuestion = { id: parseInt(req.params.id), ...req.body }; // تحديث البيانات
        questions[questionIndex] = updatedQuestion;
        saveQuestions(questions);
        res.send('تم تعديل السؤال بنجاح!');
    } else {
        res.status(404).send('السؤال غير موجود.');
    }
});

// حذف سؤال محدد
app.delete('/questions/:id', (req, res) => {
    const questions = readQuestions();
    const questionIndex = questions.findIndex(q => q.id == req.params.id);

    if (questionIndex !== -1) {
        questions.splice(questionIndex, 1); // حذف السؤال
        saveQuestions(questions);
        res.send('تم حذف السؤال بنجاح!');
    } else {
        res.status(404).send('السؤال غير موجود.');
    }
});

// بدء الخادم
app.listen(PORT, () => {
    console.log(`الخادم يعمل على http://localhost:${PORT}`);
});
