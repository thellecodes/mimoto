from flask import Flask, jsonify, request
import json

app = Flask(__name__)

with open('data/users.json', 'r') as f:
    users_data = json.load(f)


@app.route('/users', methods=['GET'])
def get_users():
    """
    curl http://127.0.0.1:5000/users
    """
    return jsonify(users_data)


@app.route('/users/<username>', methods=['GET'])
def get_user_by_username(username):
    """
    curl http://127.0.0.1:5000/users/user1
    """
    user = next((user for user in users_data if user['username'] == username), None) # noqa
    return jsonify(user) if user else ('', 404)


@app.route('/users', methods=['POST'])
def create_user():
    """
    curl -X POST -H "Content-Type: application/json" -d '{"username":"newuser",
    "email":"newuser@example.com", "publicAddress":"0xnew123456789", "discordUsername":"newuser#0004", # noqa
    "xUsername":"xnewuser"}' http://127.0.0.1:5000/users
    """
    new_user = request.json
    users_data.append(new_user)
    with open('data/users.json', 'w') as f:
        json.dump(users_data, f, indent=4)
    return jsonify(new_user), 201

# Soroban interactions


if __name__ == '__main__':
    app.run(debug=True)
