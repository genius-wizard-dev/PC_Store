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

export interface ProductResponse {
    content: Product[];
    totalPages: number;
}

export interface ProductDetail {
  id:              string;
  images:          string[];
  productId:       string;
  processor:       string;
  ram:             string;
  storage:         string;
  graphicsCard:    string;
  powerSupply:     string;
  motherboard:     string;
  case_:           string;
  coolingSystem:   string;
  operatingSystem: string;
}


