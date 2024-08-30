const useFilter = (filter ) => {    
    function filterByTime(item) {
      if (filter["TIME"] === "Hôm nay") {
        let dateOnly = new Date().toDateString();
        let orderDate = new Date(item.orderDate).toDateString();
        return orderDate === dateOnly;
      }
  
      if (filter["TIME"] === "Tất cả") {
        return true;
      }
  
      if (filter["TIME"] === "7 Ngày Trước") {
        let today = new Date();
        let lastWeek = new Date();
        lastWeek.setDate(today.getDate() - 7);
        let orderDate = new Date(item.orderDate);
        return orderDate >= lastWeek && orderDate <= today;
      }
  
      return true;
    }
  
    function filterByCustomer(item) {
      if (filter["CUSTOMER"] === '') {
        return true;
      }
      return item.customer.toLowerCase().includes(filter["CUSTOMER"].toLowerCase());
    }
  
    function filterByEmployee(item) {
      if (filter["EMPLOYEE"] === '') {
        return true;
      }
      return item.employee.toLowerCase().includes(filter["EMPLOYEE"].toLowerCase()); 
    }
  
    function filterByPhone(item) {
      if (filter["PHONE"] === '') {
        return true;
      }
      return item.sdt===filter["PHONE"].toString(); 
    }
  
    function filterByTable(item) {
      if (filter["TABLE"] === '') {
        return true;
      }

      if (filter["TABLE"] == 0) {
        return item.table.toLowerCase().includes("no table");
      }     
      return item.table.toLowerCase().includes(filter["TABLE"].toLowerCase())
    }
  
    function filterByStatus(item) {
      if (filter["STATUS"] === '') {
        return true;
      }
      return item.status === filter["STATUS"].toString(); // Assuming 'status' is the field in item
    }
  
    function applyFilters(items) {
      return items.filter(item =>
        filterByTime(item) &&
        filterByCustomer(item) &&
        filterByEmployee(item) &&
        filterByPhone(item) &&
        filterByTable(item) &&
        filterByStatus(item)
      );
    }
  
    return {
      applyFilters
    };
  };
  
  export default useFilter;
  