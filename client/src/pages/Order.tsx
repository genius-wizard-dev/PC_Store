import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RootState } from "@/redux/store";
import { Package, Truck, User } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Order() {
  const { orders } = useSelector((state: RootState) => state.order);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6 text-gray-600">
        <Link to="/" className="hover:text-orange-500">
          Trang chủ
        </Link>
        <span>/</span>
        <span className="text-orange-500">Đơn hàng</span>
      </div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Đơn hàng của bạn
      </h1>

      <div className="grid gap-6">
        {orders.map((order, index) => (
          <Link key={order.id} to={`/order/${order.id}`}>
            <Card className="hover:bg-gray-50 transition-all duration-300 border border-gray-200">
              <CardHeader className="border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-medium text-gray-800">
                    Đơn hàng #{index + 1}
                  </CardTitle>
                  <div className="text-lg font-semibold text-primary">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.totalPrice)}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-gray-600 mt-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm">
                      {order.customer.firstName} {order.customer.lastName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span className="text-sm">{order.shipAddress}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {order.items.length} sản phẩm
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Order;
