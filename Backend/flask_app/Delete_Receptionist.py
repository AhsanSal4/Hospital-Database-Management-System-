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
            database='micro_project',  # Replace with your DB name
            user='root',  # Replace with your MySQL username
            password='mysql123'  # Replace with your MySQL password
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
@app.route('/get_receptionists/<r_id>', methods=['GET'])
def get_receptionists(r_id):
    connection = create_db_connection()
    if connection is None:
        return jsonify({'error': 'Database connection error'}), 500

    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT R_name FROM receptionists WHERE R_id = %s", (r_id,))
    rec = cursor.fetchone()

    cursor.close()
    connection.close()

    if rec:
        return jsonify(rec)
    else:
        return jsonify({'error': 'Receptionist not found'}), 404

@app.route('/delete_receptionists/<r_id>', methods=['DELETE'])
def delete_receptionists(r_id):
    connection = create_db_connection()
    if connection is None:
        return jsonify({'error': 'Database connection error'}), 500

    try:
        # Create separate cursors for each operation
        cursor1 = connection.cursor(dictionary=True)
        cursor2 = connection.cursor(dictionary=True)
        cursor3 = connection.cursor(dictionary=True)

        # Fetch Park_id from patients table
        cursor1.execute("SELECT Park_id FROM receptionists WHERE r_id = %s", (r_id,))
        park_result = cursor1.fetchone()  # Fetch the result

        cursor1.execute("SELECT username FROM receptionists WHERE r_id = %s", (r_id,))
        user_result = cursor1.fetchone() 

        cursor1.execute("DELETE FROM receptionists WHERE r_id = %s", (r_id,))
        connection.commit()

        if park_result and park_result['Park_id']:
            park_id = park_result['Park_id']
            
            # Delete from parking table using the fetched Park_id
            cursor2.execute("DELETE FROM parking WHERE Park_id = %s", (park_id,))
            connection.commit()

        # Fetch username from patients table
         # Fetch the result

        if user_result and user_result['username']:
            username = user_result['username']
            
            # Delete from login table using the fetched username
            cursor3.execute("DELETE FROM login WHERE username = %s", (username,))
            connection.commit()

        # Finally, delete the patient from the patients table
        if cursor1.rowcount > 0:
            return jsonify({'message': 'Receptionist deleted successfully'})
        else:
            return jsonify({'error': 'Receptionist not found'}), 404

    except Error as e:
        print(f"Error executing query: {e}")
        return jsonify({'error': 'Failed to delete Receptionist '}), 500

    finally:
        # Close all cursors and connection
        cursor1.close()
        cursor2.close()
        cursor3.close()
        connection.close()

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
