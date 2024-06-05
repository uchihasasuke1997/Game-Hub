from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/tictactoe')
def tictactoe():
    return render_template('tictactoe.html')

if __name__ == '__main__':
    app.run(debug=True)
