from flask import Flask, jsonify
import mysql.connector as myc

app = Flask(__name__)

# Route to display all medicines
@app.route('/medicines', methods=['GET'])
def display_all_medicines():
    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Query to get all medicines
        query = "SELECT M_code, Med_Name, Price, Symptom FROM Medicine"
        cur.execute(query)
        medicines = cur.fetchall()

        # Define the response structure
        response = []
        for medicine in medicines:
            medicine_info = {
                'M_code': medicine[0],
                'Med_Name': medicine[1],
                'Price': medicine[2],
                'Symptom': medicine[3]
            }
            response.append(medicine_info)

        # Return the result as JSON
        return jsonify({'medicines': response}), 200

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
