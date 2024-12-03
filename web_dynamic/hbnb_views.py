#!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from api.v1.views import app_views
from flask import Blueprint, Flask, render_template
import uuid
#app = Flask(__name__)
# app.jinja_env.trim_blocks = True
# app.jinja_env.lstrip_blocks = True


#@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


hbnb_bp = Blueprint('hbnb', __name__) #static_folder='../web_dynamic/static', template_folder='../web_dynamic/templates')

@hbnb_bp.route('/', strict_slashes=False)
@hbnb_bp.route('/4-hbnb', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    cache_id = uuid.uuid4()

    return render_template('4-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=cache_id)


#if __name__ == "__main__":
#    """ Main Function """
#    port = environ.get('HBNB_WEB_PORT', 5000)
#    app.run(host='0.0.0.0', port=port)
