from flask import Flask, jsonify, request, session, redirect, url_for, send_from_directory
from flask_cors import CORS
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)


load_dotenv("p.env")
app.secret_key = os.getenv('SECRET_KEY', 'default_dev_key')  
print(f"Loaded SECRET_KEY: {os.getenv('SECRET_KEY')}")

ADMINS = {
    "martin": "password123",
}
@app.route('/', methods=['GET'])
def show_login_page():
    return send_from_directory('.', 'login.html')  

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()  
    username = data.get('username')
    password = data.get('password')

    if username in ADMINS and ADMINS[username] == password:
        session['admin'] = username 
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('admin', None)
    return jsonify({"message": "Logged out successfully"}), 200

@app.route('/protected', methods=['GET'])
def protected():
    if 'admin' not in session:
        return jsonify({"message": "Unauthorized"}), 401
    return jsonify({"message": f"Welcome, {session['admin']}!"}), 200

@app.route('/admin', methods=['GET'])
def admin_dashboard():
    if 'admin' not in session:
        return redirect(url_for('show_login_page'))
    return send_from_directory('.', 'admin.html')

app = app
