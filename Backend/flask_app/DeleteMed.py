from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)

# MySQL Database connection
def create_db_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='hospital',  # Replace with your DB name
            user='root',  # Replace with your MySQL username
            password='Nibhin@137'  # Replace with your MySQL password
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None

@app.route('/')
def welcome():
    return """
    <h1>Welcome to Hospital Management System</h1>
    <p>Use /admin for admin functionalities, /user for user functionalities, /exit to exit.</p>
    """

# Fetch medicine details based on medicine ID
@app.route('/get_medicine/<m_id>', methods=['GET'])
def get_medicine(m_id):
    connection = create_db_connection()
    if connection is None:
        return jsonify({'error': 'Database connection error'}), 500

    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT m_name FROM medicine WHERE m_id = %s", (m_id,))
    rec = cursor.fetchone()

    cursor.close()
    connection.close()

    if rec:
        return jsonify(rec)
    else:
        return jsonify({'error': 'Medicine not found'}), 404

# Delete medicine based on medicine ID
@app.route('/delete_medicine/<m_id>', methods=['DELETE'])
def delete_medicine(m_id):
    connection = create_db_connection()
    if connection is None:
        return jsonify({'error': 'Database connection error'}), 500

    cursor = connection.cursor()
    cursor.execute("DELETE FROM medicine WHERE m_id = %s", (m_id,))
    connection.commit()

    rowcount = cursor.rowcount  # Capture row count before closing the cursor
    cursor.close()
    connection.close()

    if rowcount > 0:
        return jsonify({'message': 'Medicine deleted successfully'})
    else:
        return jsonify({'error': 'Medicine not found'}), 404

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
