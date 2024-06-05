from flask import Flask, render_template, request

app = Flask(__name__)

# Quiz game data
questions = [
    { "question": "What color is the sky during the day?", "options": ["Red", "Green", "Blue", "Yellow"], "answer": "Blue" },
    { "question": "Which fruit is known as the 'king of fruits'?", "options": ["Banana", "Apple", "Mango", "Orange"], "answer": "Mango" },
    { "question": "How many legs does a cat have?", "options": ["2", "4", "6", "8"], "answer": "4" },
    { "question": "What is the capital city of the United States?", "options": ["Washington", "New York", "Los Angeles", "Chicago"], "answer": "Washington" },
    { "question": "Which season comes after winter?", "options": ["Spring", "Summer", "Autumn", "Monsoon"], "answer": "Spring" }
]

@app.route('/')
def index():
    return render_template('index.html', questions=questions)

@app.route('/submit_answer', methods=['POST'])
def submit_answer():
    # Get data from the form
    selected_option = request.form['option']
    question_index = int(request.form['question_index'])
    correct_answer = questions[question_index]['answer']
    
    # Check if the answer is correct
    if selected_option == correct_answer:
        result = "You are correct!"
    else:
        result = f"Wrong! The correct answer is {correct_answer}"
    
    return result

if __name__ == '__main__':
    app.run(debug=True)
