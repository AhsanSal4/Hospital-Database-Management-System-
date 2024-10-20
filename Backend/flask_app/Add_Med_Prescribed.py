from flask import Flask, request, jsonify
import mysql.connector as myc

app = Flask(__name__)

@app.route('/add_medicine', methods=['POST'])
def add_medicine():
    data = request.get_json()
    P_Code = data.get('P_Code')
    Medicine = data.get('Medicine')

    try:
        db = myc.connect(host='localhost', user='root', port='3306', passwd='Nibhin@137', database='hospital')
        cur = db.cursor()

        q = "UPDATE Patient SET Med_Prescribed = %s WHERE P_code = %s"
        cur.execute(q, (Medicine, P_Code))
        db.commit()
        return jsonify({'message': 'Record(s) added successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cur.close()
        db.close()



