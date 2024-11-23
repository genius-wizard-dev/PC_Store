export interface ListOrderResponse {
  code:   number;
  result: Result[];
}

export interface Result {
  id:          string;
  customer:    Customer;
  shipAddress: string;
  items:       Item[];
  totalPrice:  number;
  orderStatus: string;
  orderDate:   string;
}



export interface Customer {
  id:          string;
  userName:    string;
  firstName:   string;
  lastName:    string;
  email:       string;
  phoneNumber: string;
  password:    string;
}

export interface Item {
  product:  Product;
  quantity: number;
}

export interface Product {
  id:                 string;
  name:               string;
  img:                string;
  priceAfterDiscount: number;
  originalPrice:      number;
  discountPercent:    number;
  priceDiscount:      number;
  supplier:           Supplier;
}

export interface Supplier {
  name:    string;
  address: string;
}
