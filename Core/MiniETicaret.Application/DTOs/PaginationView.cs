namespace MiniETicaret.Application.DTOs
{
    public class PaginationView<T>
    {
        public List<T> Items { get; set; }
        public int TotalRow { get; set; }
    }
}
