﻿namespace RestaurantListening.Models
{
    public class RequestParams
    {
        const int maxPageSize = 1000;

        public int PageNumber { get; set; } = 1;

        private int _pageSize = 1000;

        public int PageSize
        {
            get { return _pageSize; } 
            set { _pageSize = (value > maxPageSize) ? maxPageSize : value; }
        }
    }
}
