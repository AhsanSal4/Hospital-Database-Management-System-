from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector as myc
import random

app = Flask(__name__)
CORS(app)

@app.route('/medicineregister', methods=['POST'])
def add_new_medicine():
    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Extract data from request body
        data = request.json
        medicine_name = data.get('m_name')
        price = data.get('price')
        disease = data.get('disease')

        medicine_id = generate_medicine_id()

        # Insert medicine details into the Medicine table
        cur.execute("""
        INSERT INTO medicine (m_id, m_name, price, disease)
        VALUES (%s, %s, %s, %s)
        """, (medicine_id, medicine_name, price, disease))

        db.commit()
        return jsonify({
            'message': 'Medicine registered successfully',
            'medicine_id': medicine_id
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cur.close()
        db.close()

def generate_medicine_id():
    return 'M'+ ''.join(random.choices('0123456789', k=4))

if __name__ == '__main__':
    app.run(debug=True)
