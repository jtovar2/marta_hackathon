import requests
import json

def get_all_buses(url):
    response = requests.get(url)
    buses = json.loads(response.text)
    if len(buses) == 0:
        return "There are no buses"
    else:
        return buses


marta_url = "http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus"
marta_buses = get_all_buses(marta_url)

for marta_bus in marta_buses:
    print marta_bus['TIMEPOINT'] + " " + marta_bus['ROUTE']