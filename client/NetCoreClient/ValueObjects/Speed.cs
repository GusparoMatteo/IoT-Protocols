namespace NetCoreClient.ValueObjects
{
    internal class Speed
    {
        public int Value { get; private set; }
        
        public Speed(int value)
        {
            this.Value = value;
        }

    }
}
