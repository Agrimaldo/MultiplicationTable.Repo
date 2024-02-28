using MultiplicationTable.API.Dto.Output;
using MultiplicationTable.API.Interfaces;
using System.IO;
using System.Text;
using System.Threading;

namespace MultiplicationTable.API.Services
{
    public class CalculateService: ICalculateService
    {
        private ILogger _logger;
        private int maxThread = 5;
        private SemaphoreSlim semaphoreSlim;

        public CalculateService(ILogger<CalculateService> logger)
        {
            _logger = logger;
            semaphoreSlim = new SemaphoreSlim(maxThread);
        }
        public async Task<List<CalculateOutput>> Multiplication(IList<int> input)
        {
            var result = await Task.FromResult(() => {
                int waitCounter = 1;
                List<CalculateOutput> calculateOutputList = new List<CalculateOutput>();

                input.ToList().ForEach(numberInput =>
                {
                    CalculateOutput output = new CalculateOutput() { Number = numberInput };

                    var thread = new Thread(() =>
                    {
                        _logger.LogInformation($"Thread enter for number {numberInput}");
                        semaphoreSlim.WaitAsync();

                        StringBuilder stringBuilder = new StringBuilder();

                        for (int i = 1; i <= 10; i++)
                        {
                            output.MultiplicationTable.Add(Tuple.Create(i, numberInput * i));
                            stringBuilder.AppendLine($"{numberInput} x {i} = {numberInput * i}");
                        }
                        string filePath = $"{Directory.GetCurrentDirectory()}\\Store\\tabuada_de_{numberInput}.txt";

                        File.WriteAllText(filePath, stringBuilder.ToString());

                        Thread.Sleep(1000 * waitCounter);
                        semaphoreSlim.Release();
                        _logger.LogInformation($"Thread finished for number {numberInput}");
                    });

                    calculateOutputList.Add(output);

                    waitCounter++;
                    thread.Start();
                    
                });


                Task.WaitAll();
                return calculateOutputList;
            });

            return result.Invoke();
        }
    }
}
