from flask import Flask, request, jsonify
import mysql.connector as myc
import random

app = Flask(__name__)

# Function to add medicine (Flask version)
@app.route('/add_medicine', methods=['POST'])
def add_medicine():
    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Helper functions for padding strings
        def med_name(me):
            return me.ljust(20)  # Pad to 20 characters

        def symptom_(d):
            return d.ljust(20)  # Pad to 20 characters

        def price_(p):
            return p.ljust(5)  # Pad to 5 characters

        # Get data from the request (assuming JSON input)
        data = request.json
        m_name = data.get('medicine_name')
        price = data.get('price')
        symptom = data.get('symptom')

        # Call helper functions to adjust the data
        me = med_name(m_name)
        s = symptom_(symptom)
        p = price_(price)

        # Generate a random medicine code
        m_code = (
            random.choice('ABCDEFCGHIJKLMNOPQRSTUVWXYZ') +
            ''.join(random.choices('1234567890', k=4))
        )

        # Insert query
        query = "INSERT INTO medicine (m_id, m_name, price, disease) VALUES (%s, %s, %s, %s)"
        values = (m_code, me, p, s)
        cur.execute(query, values)

        db.commit()

        # Return success response
        return jsonify({
            'message': f'{cur.rowcount} record(s) added',
            'm_code': m_code
        }), 200

    except Exception as error:
        # Return error response
        return jsonify({'error': str(error)}), 500

    finally:
        # Close cursor and connection
        cur.close()
        db.close()

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)
