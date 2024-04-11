using NetCoreClient.Sensors;
using NetCoreClient.Protocols;
using System.Text.Json;
using Newtonsoft.Json.Linq;
using System.Globalization;

// define sensors
List<ISensorInterface> sensors = new(); 
//sensors.Add(new VirtualSpeedSensor());
sensors.Add(new VirtualLevelBatterySensor());

// define protocol
ProtocolInterface protocol = new Http("https://3456-217-201-225-112.ngrok-free.app/cars/123");

// send data to server
while (true)
{
//    string s1 = @"{
//  'FirstName': 'John',
//  'LastName': 'Smith',
//  'Enabled': false,
//  'Roles': [ 'User' ]
//}";
    //var json1 = JObject.Parse(s1);
    //var json2 = JObject.Parse(s1);
    foreach (ISensorInterface sensor in sensors)
    {
        var sensorValue = sensor.ToJson();
        //json1.Merge(sensorValue);

        //if (json2 != JObject.Parse(s1))
        //{
        //    json2.Merge(json1);
        //}
        //else
        //{
        //    json2 = json1;
        //}
        protocol.Send(sensorValue);

        Console.WriteLine(sensorValue);

        Thread.Sleep(5000);

    }

    //var message = JsonSerializer.Serialize(json2);
    //protocol.Send(message);

    //Console.WriteLine(message);

    //Thread.Sleep(5000);
}
