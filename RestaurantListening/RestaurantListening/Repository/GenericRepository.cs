using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using RestaurantListening.Data;
using RestaurantListening.IRepository;
using RestaurantListening.Models;
using System.Linq.Expressions;
using X.PagedList;
using X.PagedList.Extensions;

namespace RestaurantListening.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly RestaurantDbContext _context;
        private readonly DbSet<T> _db;
        public GenericRepository(RestaurantDbContext context)
        {
            _context = context;
            _db = _context.Set<T>();
        }
        public async Task Delete(int id)
        {
            var entity = await _db.FindAsync(id);
            _db.Remove(entity);
        }

        public void DeleteRange(IEnumerable<T> entities)
        {
            _db.RemoveRange(entities);
        }

        public async Task<T> Get(Expression<Func<T, bool>> expression, List<string> includes = null)
        {
            IQueryable<T> query = _db;

            if (includes != null)
            {
                foreach (var includePropery in includes)
                {
                    query = query.Include(includePropery);
                }
            }

            return await query.AsNoTracking().FirstOrDefaultAsync(expression);
        }

        public T GetT(Expression<Func<T, bool>> expression)
        {
            IQueryable<T> query = _db;
            return query.AsNoTracking().FirstOrDefault(expression);
        }

        public async Task<IList<T>> GetAll(Expression<Func<T, bool>> expression = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, List<string> includes = null)
        {
            IQueryable<T> query = _db;

            if (expression != null)
            {
                query = query.Where(expression);
            }

            if (includes != null)
            {
                foreach (var includePropery in includes)
                {
                    query = query.Include(includePropery);
                }
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }
            return await query.AsNoTracking().ToListAsync();

        }

        public async Task<IPagedList<T>> GetAll(RequestParams requestParams ,
            List<string> includes = null)
        {
            IQueryable<T> query = _db;

            if (includes != null)
            {
                foreach (var includePropery in includes)
                {
                    query = query.Include(includePropery);
                }
            }

            return await Task.FromResult(query.AsNoTracking().ToPagedList(requestParams.PageNumber, requestParams.PageSize));

        }
        public async Task Insert(T entity)
        {
            await _db.AddAsync(entity);
        }

        public async Task InsertRange(IEnumerable<T> entities)
        {
            await _db.AddRangeAsync(entities);
        }

        public void Update(T entity)
        {
            _db.Attach(entity);
            _db.Entry(entity).State = EntityState.Modified;
        }
    }
}
