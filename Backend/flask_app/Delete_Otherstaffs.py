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
<<<<<<< HEAD
            database='hospital',  # Replace with your DB name
            user='root',  # Replace with your MySQL username
            password='Nibhin@137'  # Replace with your MySQL password
=======
            database='micro_project',  # Replace with your DB name
            user='root',  # Replace with your MySQL username
            password='mysql123'  # Replace with your MySQL password
>>>>>>> ac572aa7f51ab17beb358ee39e9a2c33d16d92c9
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
# Route to delete a receptionist by R_code
@app.route('/get_staffs/<s_id>', methods=['GET'])
def get_staffs(s_id):
    connection = create_db_connection()
    if connection is None:
        return jsonify({'error': 'Database connection error'}), 500

    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT S_name FROM other_staffs WHERE S_id = %s", (s_id,))
    rec = cursor.fetchone()

    cursor.close()
    connection.close()

    if rec:
        return jsonify(rec)
    else:
        return jsonify({'error': 'Staff not found'}), 404

@app.route('/delete_staffs/<s_id>', methods=['DELETE'])
def delete_staffs(s_id):
    connection = create_db_connection()
    if connection is None:
        return jsonify({'error': 'Database connection error'}), 500

    cursor = connection.cursor()

    # The tuple must have a trailing comma to ensure it's interpreted correctly
    cursor.execute("DELETE FROM other_staffs WHERE S_id = %s", (s_id,))  # Add a trailing comma

    connection.commit()

    rowcount = cursor.rowcount  # Capture row count before closing the cursor
    cursor.close()
    connection.close()

    if rowcount > 0:
        return jsonify({'message': 'Staff deleted successfully'})
    else:
        return jsonify({'error': 'Staff not found'}), 404


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
