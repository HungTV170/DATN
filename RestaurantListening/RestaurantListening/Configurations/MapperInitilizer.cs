using AutoMapper;
using RestaurantListening.Data;
using RestaurantListening.IRepository;
using RestaurantListening.Models;
using RestaurantListening.Repository;
using RestaurantListening.Services;

namespace RestaurantListening.Configurations
{
    public class MapperInitilizer : Profile
    {

        public MapperInitilizer()
        { 
            CreateMap<Customer, CustomerDTO>().ReverseMap();
            CreateMap<Customer, CreatedCustomerDTO>().ReverseMap();
            CreateMap<Employee, EmployeeDTO>().ReverseMap();
            CreateMap<Employee, CreatedEmployeeDTO>().ReverseMap();
            CreateMap<MenuItem, MenuItemDTO>().ReverseMap();
            CreateMap<CreatedMenuItemDTO, MenuItem>()
                .ForMember(dest => dest.ItemImg, opt => opt.MapFrom(src => src.ImgFile != null ? src.ImgFile.FileName : "NoIMG.jpg"))
                .ReverseMap();
            //CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<Order, CreatedOrderDTO>().ReverseMap();
            CreateMap<Order, OrderDTO>()
                .ForMember(dest => dest.Customer, opt => opt.MapFrom<customerResolver>())
                .ForMember(dest => dest.Status, opt => opt.MapFrom<StatusResolver>())
                .ForMember(dest => dest.Employee, opt => opt.MapFrom<EmployeeResolver>())
                .ForMember(dest => dest.Table, opt => opt.MapFrom<TableResolver>())
                .ForMember(dest => dest.SDT, opt => opt.MapFrom<SDTResolver>());


            CreateMap<OrderTable, OrderTableDTO>()
                .ForMember(dest => dest.Table, opt => opt.MapFrom<Table1Resolver>());
            CreateMap<OrderTable, CreatedOrderTableDTO>().ReverseMap();

            CreateMap<OrderItem, OrderItemDTO>()
                .ForMember(dest => dest.MenuItem, opt => opt.MapFrom<ItemNameResolver>())
                .ForMember(dest => dest.FileName, opt => opt.MapFrom<FileNameResolver>());

            CreateMap<CreatedOrderItemDTO, OrderItem>()
                .ForMember(dest => dest.Price, opt => opt.MapFrom<PriceResolver>());
            CreateMap<PaymentDTO, Payment>().ReverseMap();
         
            CreateMap<CreatedPaymentDTO,Payment>()
                 .ForMember(dest => dest.PaymentDate, opt => opt.MapFrom<DateResolver>());
            CreateMap<Reservation, ReservationDTO>()
                .ForMember(dest => dest.CustomerName, opt => opt.MapFrom<NameResolver>())
                .ForMember(dest => dest.CustomerPhone, opt => opt.MapFrom<PhoneResolver>());
            CreateMap<Reservation, CreatedReservationDTO>().ReverseMap();
            CreateMap<Table, TableDTO>().ReverseMap();
            CreateMap<Table, CreatedTableDTO>().ReverseMap();
            CreateMap<ApiUser, UserDTO>().ReverseMap();
        }

        public class customerResolver(IUnitOfWork _unitOfWork) : IValueResolver<Order, OrderDTO, string>
        {
            public string Resolve(Order source, OrderDTO destination, string destMember, ResolutionContext context)
            {

                var cus = _unitOfWork.Customers.GetT(q => q.CustomerId == source.CustomerId);
                return $"{cus.FirstName} {cus.LastName}";
            }
        }
        public class SDTResolver(IUnitOfWork _unitOfWork) : IValueResolver<Order, OrderDTO, string>
        {
            public string Resolve(Order source, OrderDTO destination, string destMember, ResolutionContext context)
            {

                var cus = _unitOfWork.Customers.GetT(q => q.CustomerId == source.CustomerId);
                return $"{cus.PhoneNumber}";
            }
        }

        public class StatusResolver(IUnitOfWork _unitOfWork) : IValueResolver<Order, OrderDTO, string>
        {
            public string Resolve(Order source, OrderDTO destination, string destMember, ResolutionContext context)
            {

                var cus = _unitOfWork.OrderStatusTypes.GetT(q => q.StatusId == source.StatusId);
                return $"{cus.Type}";
            }
        }

        public class EmployeeResolver(IUnitOfWork _unitOfWork) : IValueResolver<Order, OrderDTO, string>
        {
            public string Resolve(Order source, OrderDTO destination, string destMember, ResolutionContext context)
            {
                var emp = _unitOfWork.Employees.GetT(q => q.EmployeeId == source.EmployeeId);
                return $"{emp.FirstName} {emp.LastName}";
            }
        }
        public class TableResolver(IUnitOfWork _unitOfWork) : IValueResolver<Order, OrderDTO, string>
        {
            public string Resolve(Order source, OrderDTO destination, string destMember, ResolutionContext context)
            {
                if(source.OrderTables == null)
                {
                    return "No Table";
                }
                if (!source.OrderTables.Any())
                {
                    return "No Table";
                }
                var result ="";
                foreach(var item in source.OrderTables)
                {
                    var emp = _unitOfWork.Tables.GetT(q => q.TableId == item.TableId);
                    result += $"{ emp.TableNumber} ,";
                }
                if (result.EndsWith(","))
                {
                    result = result.TrimEnd(',');
                }

                return $"{result}";
            }
        }

        public class ItemNameResolver(IUnitOfWork _unitOfWork) : IValueResolver<OrderItem, OrderItemDTO, string>
        {
            public string Resolve(OrderItem source, OrderItemDTO destination, string destMember, ResolutionContext context)
            {
                var res = _unitOfWork.MenuItems.GetT(q => q.ItemId == source.ItemId);
                return $"{res.Name}";
            }
        }

        public class FileNameResolver(IUnitOfWork _unitOfWork) : IValueResolver<OrderItem, OrderItemDTO, string>
        {
            public string Resolve(OrderItem source, OrderItemDTO destination, string destMember, ResolutionContext context)
            {
                var res = _unitOfWork.MenuItems.GetT(q => q.ItemId == source.ItemId);
                return $"{res.ItemImg}";
            }
        }

        public class PriceResolver(IUnitOfWork _unitOfWork) : IValueResolver<CreatedOrderItemDTO, OrderItem, decimal>
        {
            public decimal Resolve(CreatedOrderItemDTO source, OrderItem destination, decimal destMember, ResolutionContext context)
            {
                var res = _unitOfWork.MenuItems.GetT(q => q.ItemId == source.ItemId);
                return res.Price;
            }
        }
        public class PhoneResolver(IUnitOfWork _unitOfWork) : IValueResolver<Reservation, ReservationDTO, string>
        {
            public string Resolve(Reservation source, ReservationDTO destination, string destMember, ResolutionContext context)
            {
                var res = _unitOfWork.Customers.GetT(q=>q.CustomerId == source.CustomerId);
                return res.PhoneNumber;
            }
        }
        public class NameResolver(IUnitOfWork _unitOfWork) : IValueResolver<Reservation, ReservationDTO, string>
        {
            public string Resolve(Reservation source, ReservationDTO destination, string destMember, ResolutionContext context)
            {
                var res = _unitOfWork.Customers.GetT(q => q.CustomerId == source.CustomerId);
                return res.FirstName + " " + res.LastName;
            }
        }

        public class DateResolver(IUnitOfWork _unitOfWork) : IValueResolver<CreatedPaymentDTO, Payment, DateTime>
        {
            public DateTime Resolve(CreatedPaymentDTO source, Payment destination, DateTime destMember, ResolutionContext context)
            {
                return DateTime.Now;
            }
        }

        public class Table1Resolver(IUnitOfWork _unitOfWork) : IValueResolver<OrderTable, OrderTableDTO, string>
        {
            public string Resolve(OrderTable source, OrderTableDTO destination, string destMember, ResolutionContext context)
            {
                var cus = _unitOfWork.Tables.GetT(q => q.TableId == source.TableId);
                return $"{cus.TableNumber}";
            }
        }
    }

}
