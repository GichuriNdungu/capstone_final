from flask import Flask, jsonify, request, session, redirect, url_for, render_template, send_from_directory
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Load Environment Variables
load_dotenv("p.env")
app.secret_key = os.getenv('SECRET_KEY', 'default_dev_key')  # Fallback key for development
print(f"Loaded SECRET_KEY: {os.getenv('SECRET_KEY')}")

# Hardcoded Admin Credentials
ADMINS = {
    "martin": "password123",
}

# Display Login Page (GET Request)
@app.route('/login', methods=['GET'])
def show_login_page():
    return send_from_directory('.', 'login.html')  # No need for "data" unless passing context

# Handle Login (POST Request)
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Expecting JSON payload
    username = data.get('username')
    password = data.get('password')

    # Validate Credentials
    if username in ADMINS and ADMINS[username] == password:
        session['admin'] = username  # Store session info
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"message": "Invalid credentials"}), 401

# Handle Logout
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('admin', None)
    return jsonify({"message": "Logged out successfully"}), 200

# Protected Endpoint
@app.route('/protected', methods=['GET'])
def protected():
    if 'admin' not in session:
        return jsonify({"message": "Unauthorized"}), 401
    return jsonify({"message": f"Welcome, {session['admin']}!"}), 200

# Admin Dashboard
@app.route('/admin', methods=['GET'])
def admin_dashboard():
    if 'admin' not in session:
        return redirect(url_for('show_login_page'))  # Redirect to login page if not logged in
    return send_from_directory('.', 'admin.html')

if __name__ == '__main__':
    app.run(port=5500, debug=True)
