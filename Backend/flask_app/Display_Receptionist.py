from flask import Flask, jsonify
import mysql.connector as myc

app = Flask(__name__)

# Route to display all receptionists
@app.route('/receptionists', methods=['GET'])
def display_receptionists():
    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Query to get all receptionists
        query = "SELECT * FROM Receptionist"
        cur.execute(query)
        receptionists = cur.fetchall()

        # Define the response structure
        response = []
        for receptionist in receptionists:
            receptionist_info = {
                'R_id': receptionist[0],
                'R_Name': receptionist[1],
                'Age': receptionist[2],
                'Salary': receptionist[3],
                'Work_Hours': receptionist[4],
                'Password': receptionist[5],
                'Gender': receptionist[6]
            }
            response.append(receptionist_info)

        # Return the result as JSON
        return jsonify({'receptionists': response}), 200

    except Exception as error:
        # Return an error response in case of an exception
        return jsonify({'error': str(error)}), 500

    finally:
        # Close cursor and connection
        cur.close()
        db.close()

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
