from flask import Flask, redirect, render_template, request
from uber_rides.auth import AuthorizationCodeGrant
from uber_rides.session import Session
from uber_rides.client import UberRidesClient
import googlemaps
from googlemaps import distance_matrix
from uber_rides.session import Session
from uber_rides.client import UberRidesClient
from uber_rides.auth import AuthorizationCodeGrant
from uber_rides.session import Session
from uber_rides.client import UberRidesClient
import json

app = Flask(__name__)
maps_client = googlemaps.Client(key='AIzaSyBQyKQQh6QIdO_yP_2iBcveuJM5a5GIUkg')
client_id = "TIvRAECnK2JEv6tx9y0bAms6HxspyvOP"
client_secret = "3wYOwVb_DMSJU_58TnGvkdNWBW8vIy4izVhk-tj4"
server_token = "V7F1LqXN0y7iVdkiX4-EQHzcsppNIvDdWiqC38M9"
scopes = ["history", "request_receipt", "ride_widgets"]
session = Session(server_token=server_token)
client = UberRidesClient(session)
auth_flow = AuthorizationCodeGrant(
    client_id,
    scopes,
    client_secret,
    'http://localhost:8080/dashboard'
    )


@app.route('/', methods=['GET', 'POST'])
def homepage():
    # Return a Jinja2 HTML template and pass in image_entities as a parameter.
    auth_url = auth_flow.get_authorization_url()
    return render_template('homepage.html', loginlink=auth_url)

@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    session_url = request.url
    session = auth_flow.get_session(session_url)
    client = UberRidesClient(session, sandbox_mode=True)
    credentials = session.oauth2credential
    print("session is type " + str(type(session)))
    # TODO store the credentials in the database
    response = client.get_user_profile()
    profile = response.json
    fname = profile.get('first_name')
    lname = profile.get('last_name')
    email = profile.get('email')
    response = client.get_user_activity()
    history = response.json
    print(history)
    return render_template('dashboard.html', history=history)


@app.route('/anotherpage', methods=['GET', 'POST'])
def anotherpage():
    to_input = request.form['to_addr']
    from_input = request.form['from_addr']
    bike_json = distance_matrix.distance_matrix(maps_client, from_input, to_input, mode='bicycling')
    bike_time = bike_json['rows'][0]['elements'][0]['duration']['text']
    walk_json = distance_matrix.distance_matrix(maps_client, from_input, to_input, mode='walking')
    walk_time = walk_json['rows'][0]['elements'][0]['duration']['text']
    return render_template('anotherpage.html', bike_time=bike_time, walk_time=walk_time)

@app.errorhandler(500)
def server_error(e):
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500

if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)

