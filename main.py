from flask import Flask, redirect, render_template, request
import googlemaps
from googlemaps import distance_matrix
import json

app = Flask(__name__)
maps_client = googlemaps.Client(key='AIzaSyBQyKQQh6QIdO_yP_2iBcveuJM5a5GIUkg')

@app.route('/')
def homepage():
    # Return a Jinja2 HTML template and pass in image_entities as a parameter.
    return render_template('homepage.html')


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

