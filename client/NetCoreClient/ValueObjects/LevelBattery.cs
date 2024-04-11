namespace NetCoreClient.ValueObjects
{
    internal class LevelBattery
    {
        public int Value { get; private set; }

        public LevelBattery(int value)
        {
            this.Value = value;
        }

    }
}
