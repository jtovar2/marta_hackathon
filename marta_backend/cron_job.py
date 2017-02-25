import requests
import json
import pprint
def get_all_buses():
    pp = pprint.PrettyPrinter(indent=4)
    buses_http_response = requests.get("http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus")
    buses =  json.loads(buses_http_response.text)

    buses_by_lat_and_long = {}
    for bus in buses:
        bus['LATITUDE'] = bus['LATITUDE'][0:5]
        bus['LONGITUDE'] = bus['LONGITUDE'][0:6]
        bus_location = (bus['LATITUDE'], bus['LONGITUDE'])
        if bus_location in buses_by_lat_and_long:
            list_of_buses = buses_by_lat_and_long[bus_location]
            list_of_buses.append(bus)
            buses_by_lat_and_long[bus_location] = list_of_buses
        else:
            buses_by_lat_and_long[bus_location] = [bus]
            
    pprint.pprint(buses_by_lat_and_long)




def bus_locations():
    buses_http_response = requests.get("http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus")
    buses =  json.loads(buses_http_response.text)

    print buses
    buses_by_lat_and_long = {}
    for bus in buses:
        print bus
        bus['LATITUDE'] = bus['LATITUDE'][0:5]
        bus['LONGITUDE'] = bus['LONGITUDE'][0:6]
        bus_location = "lat: " + bus['LATITUDE'] + " long: "+  bus['LONGITUDE']
        if bus_location in buses_by_lat_and_long:
            list_of_buses = buses_by_lat_and_long[bus_location]
            list_of_buses.append(bus)
            buses_by_lat_and_long[bus_location] = list_of_buses
        else:
            buses_by_lat_and_long[bus_location] = [bus]

    return json.dumps(buses_by_lat_and_long)

buses = bus_locations()
print buses
