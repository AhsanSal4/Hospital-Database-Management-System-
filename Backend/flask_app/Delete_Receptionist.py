from flask import Flask, request, jsonify
import mysql.connector as myc

app = Flask(__name__)

# Route to delete a receptionist by R_code
@app.route('/delete_receptionist', methods=['DELETE'])
def delete_receptionist():
    try:
        # Connect to the database
        db = myc.connect(host='localhost', user='root', port='3306', passwd='mysql123', database='micro_project')
        cur = db.cursor()

        # Get the receptionist ID from the request (assuming JSON input)
        data = request.json
        r_id = data.get('r_code')

        # Delete query
        query = "DELETE FROM Receptionist WHERE R_code = %s"
        cur.execute(query, (r_id,))
        db.commit()

        # Check if any row was deleted
        if cur.rowcount > 0:
            return jsonify({'message': f'{cur.rowcount} record(s) deleted successfully'}), 200
        else:
            return jsonify({'message': 'No record found with the given R_code'}), 404

    except Exception as error:
        # Return an error response
        return jsonify({'error': str(error)}), 500

    finally:
        # Close the cursor and connection
        cur.close()
        db.close()

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
