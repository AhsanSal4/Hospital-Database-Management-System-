from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app)

# Connect to MySQL Database
def get_db_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='micro_project',  # Replace with your DB name
            user='root',  # Replace with your MySQL username
            password='mysql123'  # Replace with your MySQL password
        )
    except Error as e:
        print(f"Error connecting to MySQL database: {e}")
    return connection

# Update medicine information
@app.route('/update_medicine', methods=['PUT'])
def update_medicine():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        # Get the JSON data from the request
        data = request.json
        medicine_id = data.get('medicineID')  # Changed from doctorID to medicineID
        update_field = data.get('updateField')
        new_value = data.get('newValue')

        if not medicine_id or not update_field or not new_value:
            return jsonify({'error': 'Missing data: medicineID, updateField, and newValue are required'}), 400

        # Validate update_field against allowed fields
        allowed_fields = [
            'M_name',
            'Price',
            'Disease'
        ]

        if update_field not in allowed_fields:
            return jsonify({'error': 'Invalid field specified for update'}), 400

        # Construct the SQL query
        query = f"UPDATE medicine SET {update_field} = %s WHERE M_id = %s"
        cursor.execute(query, (new_value, medicine_id))
        connection.commit()
        
        # Check if any rows were affected
        if cursor.rowcount == 0:
            return jsonify({'error': 'Medicine not found'}), 404

        return jsonify({'message': 'Medicine information updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()

# Get all medicines
@app.route('/get_all_medicines', methods=['GET'])
def get_all_medicines():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Fetch all medicines
        cursor.execute("SELECT * FROM medicine")
        meds = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(meds), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
