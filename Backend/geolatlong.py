from geopy.geocoders import Nominatim
from geopy.distance import geodesic
from geopy.distance import great_circle
import pandas as pd


geolocator = Nominatim(user_agent="eco-mode")
location = geolocator.geocode("Zachry education complex")
destination= (location.latitude, location.longitude)
print(location.address)
print((location.latitude, location.longitude))


msc=(30.612229650000003, -96.34122290814813)
distance=(geodesic(msc, destination).miles)
time = (distance / 50) * 60
if time>60:
    time=time/60
    time=time*10
    print(time)
    time = pd.to_datetime(time, format='%H%M')
    print('The number of miles is......',distance,"....",time.hour,'hour(s)',time.minute,'minutes')
elif time<1:
    time = (distance / 25)*60
    time = pd.to_datetime(time, format='%M')
    print('The number of miles is......', distance, "....", time.minute, 'minutes')
else:
    time = pd.to_datetime(time, format='%M')
    print('The number of miles is......',distance,"....",time.minute,'minutes')