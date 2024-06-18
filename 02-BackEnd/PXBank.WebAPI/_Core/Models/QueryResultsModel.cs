namespace PXBank.WebAPI._Core.Models
{
    [Serializable]
    public class QueryResultsModel
    {
        public object items { get; set; }
        public int totalCount { get; set; }
        public string errorMessage { get; set; }
        public object obj { get; set; }
    }
}
