using NetCoreClient.ValueObjects;
using System.Text.Json;

namespace NetCoreClient.Sensors
{
    class VirtualLevelBatterySensor : ILevelBatterySensorInterface, ISensorInterface
    {
        private readonly Random Random;

        public VirtualLevelBatterySensor()
        {
            Random = new Random();
        }

        public int LevelBattery()
        {
            return new LevelBattery(Random.Next(100)).Value;
        }

        public string ToJson()
        {
            return JsonSerializer.Serialize(LevelBattery());
        }

        public string GetSlug()
        {
            return "LevelBattery";
        }
    }
}
