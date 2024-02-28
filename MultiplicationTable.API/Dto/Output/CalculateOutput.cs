namespace MultiplicationTable.API.Dto.Output
{
    public class CalculateOutput
    {
        public int Number { get; set; }
        public IList<Tuple<int, int>> MultiplicationTable { get; set; } = new List<Tuple<int, int>>();
    }
}
