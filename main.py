from flask import Flask, redirect, render_template, request
import decimal
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
    return render_template('homepage.html')

@app.route('/login', methods=['GET','POST'])
def login():
    print("WADDUP")
    if request.method == 'POST':
        if request.form['uid'] is not None:
            return redirect(auth_flow.get_authorization_url())
        else:
            return redirect("leekspin.com")

@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    session_url = request.url
    session = auth_flow.get_session(session_url)
    client = UberRidesClient(session, sandbox_mode=True)
    credentials = session.oauth2credential
    # TODO store the credentials in the database
    response = client.get_user_activity()
    history = response.json
    for x in range(len(history['history'])):
        history['history'][x]['distance'] = round(history['history'][x]['distance'], 2)
    print(history)
    price_list = []
    for ride in history['history']:
        price_list.append(get_estimated_price(ride['start_time'], ride['end_time'], ride['distance']))
    print(price_list)
    walk_matrix = [['1011 Railroad Ave, San Luis Obispo, CA 93401, US', 'Cerro Hollister, San Luis Obispo, CA 93405, USA'],
                   ['1701 Grand Ave, Del Mar, CA 92014, USA', '3663 Lorimer Ln, Encinitas, CA 92024, USA'],
                   ['3951 Camino Calma, San Diego, CA 92122, USA', '507 Kristen Ct, Encinitas, CA 92024, US'],
                   ['100 Grand Ave, San Luis Obispo, CA 93405, USA', '740 W Foothill Blvd, San Luis Obispo, California 93405, US'],
                   ['1011 Railroad Ave, San Luis Obispo, CA 93401, US', 'Cerro Hollister, San Luis Obispo, CA 93405, USA']
                   ]
    walking_times = []
    for to_from in walk_matrix:
        dist_mx = distance_matrix.distance_matrix(maps_client, to_from[0], to_from[1], mode='walking')
        walking_times.append(dist_mx['rows'][0]['elements'][0]['duration']['text'])
    user_data = {
        'history': history,
        'price_list': price_list,
        'walking_times': walking_times
    }
    return render_template('dashboard.html', user_data=user_data, credentials=credentials)


@app.errorhandler(500)
def server_error(e):
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500

def get_estimated_price(start_time, end_time, distance):
    tot_time = end_time - start_time
    two_places = decimal.Decimal(10) ** -2
    return decimal.Decimal((tot_time/60) * 0.85 + distance*2).quantize(two_places)

if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)

