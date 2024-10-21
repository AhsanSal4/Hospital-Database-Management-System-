from flask import Flask, jsonify
import mysql.connector as myc

app = Flask(__name__)


# Route to fetch filled parking slots
@app.route('/get_filled_slots', methods=['GET'])
def get_filled_slots():
    try:
        # Fetch the count of filled slots from the parking table
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cursor = db.cursor()
        query = "SELECT COUNT(*) FROM parking"  # Adjust this query if necessary
        cursor.execute(query)
        result = cursor.fetchone()
        filled_slots = result[0] if result else 0

        # Return the filled slots as JSON
        return jsonify(filledSlots=filled_slots)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify(filledSlots=0), 500

if __name__ == '__main__':
    app.run(debug=True)
