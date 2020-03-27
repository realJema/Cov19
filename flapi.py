import flask
from flask import request, jsonify
from flask_cors import CORS
import json
import sys
import pprint

app = flask.Flask(__name__)
CORS(app)
# app.config["DEBUG"] = True


# funciton to return data 
def data():
    with open('data.txt') as json_file:
        data = json.load(json_file)
    return data

# funciton to return data 
def updateLocal(cmr_stat):
    # writing json response to file 
    with open('data.txt', 'r') as json_file_read:
        data = json.load(json_file_read)
        data["cmr_stat"] = cmr_stat
    with open('data.txt', 'w') as json_file_write:
        json.dump(data, json_file_write)
    return 'Updated'

# funciton to return data 
def updateGlobal(glb_stat):
    # writing json response to file 
    with open('data.txt', 'r') as json_file_read:
        data = json.load(json_file_read)
        data['glb_stat'] = glb_stat
    with open('data.txt', 'w') as json_file_write:
        json.dump(data, json_file_write)
    return 'Updated'



@app.route('/api', methods=['GET'])
def default():
    return '''<h1>NATIVE</h1>
<p>Welcome to the COVID-19 Cameroun Project.</p>'''


@app.route('/api/data', methods=['GET'])
def getData():
    return data(), 200

@app.route('/api/update/local', methods=['GET', 'POST'])
def updateLocalData():
    '''
    Get data and update storage file 
    '''
    req = request.get_json()
    updateLocal(req)
    # print(req, file=sys.stderr)
    return 'Updated', 200

@app.route('/api/update/global', methods=['GET', 'POST'])
def updateGlobalData():
    '''
    Get data and update storage file 
    '''
    req = request.get_json()
    updateGlobal(req)
    # print(req, file=sys.stderr)
    return 'Updated', 200

@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)
