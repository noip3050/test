document.getElementById('addQuestionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const questionText = document.getElementById('questionText').value;
    const option1 = document.getElementById('option1').value;
    const option2 = document.getElementById('option2').value;
    const option3 = document.getElementById('option3').value;
    const option4 = document.getElementById('option4').value;
    const correctAnswer = document.querySelector('input[name="correctAnswer"]:checked').value;

    const question = {
        text: questionText,
        options: [option1, option2, option3, option4],
        correctAnswer: correctAnswer
    };

    // إرسال البيانات إلى الخادم
    fetch('http://localhost:3000/add-question', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(question),
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        // إعادة تعيين النموذج بعد الإرسال الناجح
        document.getElementById('addQuestionForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
