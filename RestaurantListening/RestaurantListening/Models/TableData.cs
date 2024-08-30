using System;

namespace RestaurantListening.Models
{
    public class DashboardData
    {
        public string label { get; set; }
        public List<float> data { get; set; }
    }
    public class ChartData
    {
        public List<string> labels {  get; set; }

        public List<DashboardData> datasets {  get; set; }
    }
}
