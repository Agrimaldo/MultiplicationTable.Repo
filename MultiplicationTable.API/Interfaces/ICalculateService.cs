using MultiplicationTable.API.Dto.Output;

namespace MultiplicationTable.API.Interfaces
{
    public interface ICalculateService
    {
        Task<List<CalculateOutput>> Multiplication(IList<int> input);
    }
}
