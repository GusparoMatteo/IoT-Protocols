using NetCoreClient.ValueObjects;
using System.Text.Json;

namespace NetCoreClient.Sensors
{
    class VirtualSpeedSensor : ISpeedSensorInterface, ISensorInterface
    {
        private readonly Random Random;

        public VirtualSpeedSensor()
        {
            Random = new Random();
        }

        public int Speed()
        {
            return new Speed(Random.Next(100)).Value;
        }

        public string ToJson()
        {
            return JsonSerializer.Serialize(Speed());
        }

        public string GetSlug()
        {
            return "Speed";
        }
    }
}
