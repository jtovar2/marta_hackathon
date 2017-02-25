from flask import Flask, request
import requests
import json
import gviz_api

app = Flask(__name__)
app.config['DEBUG'] = True

@app.route("/buses", methods=['GET'])
def buses_near_me():
    lat = str(request.args.get('lat'))
    lng = str(request.args.get('lng'))

    if len(lat) > 5:
        lat = lat[0:5]
    if len(lng) > 6:
        lng = lng[0:6]

    buses_http_response = requests.get("http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus")
    buses =  json.loads(buses_http_response.text)

    buses_by_lat_and_long = {}
    for bus in buses:
        bus['GROUP_LATITUDE'] = bus['LATITUDE'][0:5]
        bus['GROUP_LONGITUDE'] = bus['LONGITUDE'][0:6]
        bus_location = (bus['GROUP_LATITUDE'], bus['GROUP_LONGITUDE'])
        if bus_location in buses_by_lat_and_long:
            list_of_buses = buses_by_lat_and_long[bus_location]
            list_of_buses.append(bus)
            buses_by_lat_and_long[bus_location] = list_of_buses
        else:
            buses_by_lat_and_long[bus_location] = [bus]
    if (lat,lng) in buses_by_lat_and_long:
        return json.dumps(buses_by_lat_and_long[(lat, lng)])
    else:
        return "no buses near you"

# @app.route("/buses/all", methods=['GET'])
# def bus_locations():
#     buses_http_response = requests.get("http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus")
#     buses =  json.loads(buses_http_response.text)
#
#     buses_by_lat_and_long = {}
#     for bus in buses:
#         print bus
#         bus['GROUP_LATITUDE'] = bus['LATITUDE'][0:5]
#         bus['GROUP_LONGITUDE'] = bus['LONGITUDE'][0:6]
#         bus_location = "lat: " + bus['GROUP_LATITUDE'] + " long: "+  bus['GROUP_LONGITUDE']
#         if bus_location in buses_by_lat_and_long:
#             list_of_buses = buses_by_lat_and_long[bus_location]
#             list_of_buses.append(bus)
#             buses_by_lat_and_long[bus_location] = list_of_buses
#         else:
#             buses_by_lat_and_long[bus_location] = [bus]
#
#     return json.dumps(buse)


@app.route("/buses/all", methods=['GET'])
def bus_locations():
    buses_http_response = requests.get("http://developer.itsmarta.com/BRDRestService/RestBusRealTimeService/GetAllBus")
    buses =  json.loads(buses_http_response.text)

    return json.dumps(buses)
@app.route("/hello")
def hello():
    return "HELLO"


@app.route("/javier", methods=['GET'])
def javier():
    return "heyy whats up"

marta_stations = dict()
@app.route('/update_station', methods=['POST'])
def update_station():
    request_body = request.get_json(force=True)
    station_name = request_body['STATION']
    capacity = request_body['CAPACITY']

    marta_stations[station_name] = capacity
    return "you good"

def fake_data():
    marta_stations["North Springs"] = 55
    marta_stations["Indian Creek"] = 67
    marta_stations['STATION'] = 88


@app.route('/get_parking_capacity', methods=['GET'])
def get_parking_capacities():
    description = {"STATION": ("string", "Marta Station"),
                   "CAPACITY": ("number", "Parking Capacity")}
    data_table = gviz_api.DataTable(description)
    fake_data()
    chart_rows = list()
    for station in marta_stations:
        row = {}
        row['STATION'] = station
        row['CAPACITY'] = marta_stations[station]
        chart_rows.append(row)

    data_table.LoadData(chart_rows)
    return data_table.ToJSon(columns_order=("STATION", 'CAPACITY'))

if __name__ == "__main__":
    app.run()
