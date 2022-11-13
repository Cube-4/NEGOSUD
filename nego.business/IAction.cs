namespace nego.business
{
    public interface IAction<T>
    {
        List<T> GetAll();
        T GetById(int id);
        bool DeleteById(int id);
        bool Create(T data);
        T Update(T data);
    }
}
