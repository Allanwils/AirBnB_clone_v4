import uuid

from flask import Flask, render_template
from models import storage

app = Flask(__name__)
app.url_map.strict_slashes = False


@app.teardown_appcontext
def teardown_db(exception):
    """
    Afterwords, this method calls .close() after every request
    """
    storage.close()


@app.route('/1-hbnb/')
def hbnb_filters(the_id=None):
    """
    Requests custom template with states, cities & amenities
    """
    state_objs = storage.all('State').values()
    states = {state.name: state for state in state_objs}
    amens = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = {user.id: f"{user.first_name} {user.last_name}" for user in storage.all('User').values()}
    return render_template('1-hbnb.html',
                           states=states,
                           amens=amens,
                           places=places,
                           users=users,
                           cache_id=uuid.uuid4()
                           )


if __name__ == '__main__':
    port = 5001
    host = '0.0.0.0'
    app.run(host=host, port=port)
