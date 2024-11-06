import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RootState } from "@/redux/store";
import { Package2, Phone, Truck, User } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { orders } = useSelector((state: RootState) => state.order);
  const order = orders.find((order) => order.id === id);

  if (!order) return null;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6 text-gray-600">
        <Link to="/" className="hover:text-orange-500">
          Trang chủ
        </Link>
        <span>/</span>
        <Link to="/order" className="hover:text-orange-500">
          Đơn hàng
        </Link>
        <span>/</span>
        <span className="text-orange-500">Chi tiết đơn hàng</span>
      </div>

      <div className="grid gap-6">
        <Card className="border border-gray-200 shadow-md">
          <CardHeader className="border-b border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-medium text-gray-800 flex items-center gap-2">
                <Package2 className="h-5 w-5 text-orange-500" />
                Thông tin đơn hàng
              </CardTitle>
              <div className="text-lg font-semibold text-orange-500">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.totalPrice)}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-gray-600 mt-4">
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                <User className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-sm font-medium">Khách hàng</div>
                  <div className="text-sm">
                    {order.customer.firstName} {order.customer.lastName}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                <Phone className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-sm font-medium">Số điện thoại</div>
                  <div className="text-sm">{order.customer.phoneNumber}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3 rounded-lg">
                <Truck className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="text-sm font-medium">Địa chỉ giao hàng</div>
                  <div className="text-sm">{order.shipAddress}</div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 hover:text-orange-500 cursor-pointer">
                      {item.product.name}
                    </h3>
                    <div className="mt-2 text-sm text-gray-500">
                      Nhà cung cấp: {item.product.supplier.name} -{" "}
                      {item.product.supplier.address}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="text-sm text-gray-600">
                          Số lượng:{" "}
                          <span className="font-medium">{item.quantity}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Giảm giá:{" "}
                          <span className="font-medium text-red-500">
                            {item.product.discountPercent}%
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm line-through text-gray-400">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.product.originalPrice)}
                        </div>
                        <div className="text-base font-medium text-orange-500">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(
                            item.product.priceAfterDiscount * item.quantity
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end border-t pt-6">
              <div className="text-lg">
                Tổng tiền:{" "}
                <span className="font-bold text-orange-500 text-xl">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(order.totalPrice)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default OrderDetail;
