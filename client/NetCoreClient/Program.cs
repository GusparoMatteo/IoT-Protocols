using NetCoreClient.Sensors;
using NetCoreClient.Protocols;

// define sensors
List<ISensorInterface> sensors = new(); 
//sensors.Add(new VirtualSpeedSensor());
sensors.Add(new VirtualLevelBatterySensor());

// define protocol
//IProtocolInterface protocol = new Http("https://3456-217-201-225-112.ngrok-free.app/cars/123");
IProtocolInterface protocol = new Mqtt("test.mosquitto.org");
// send data to server
while (true)
{

    foreach (ISensorInterface sensor in sensors)
    {
        var sensorValue = sensor.ToJson();

        protocol.Send(sensorValue, sensor.GetSlug());

        Console.WriteLine(sensorValue);

        Thread.Sleep(1000);

    }
}
