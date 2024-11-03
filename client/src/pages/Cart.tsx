import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/redux/store";
import { deleteCartItem, getCartCount } from "@/redux/thunks/cart";
import { Trash2 } from "lucide-react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
function Cart() {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state: RootState) => state.user);
  const totalPrice = useMemo(() => {
    return (
      items?.reduce((total, item) => {
        if (!item?.product?.priceAfterDiscount) return total;
        return total + item.product.priceAfterDiscount * item.quantity;
      }, 0) || 0
    );
  }, [items]);
  const handleDeleteCartItem = async (productId: string) => {
    try {
      const result = await dispatch(
        deleteCartItem({ userId: user?.id as string, productId }) as any
      );
      if (result.payload.code === 1000) {
        toast({
          title: "Xóa sản phẩm thành công",
        });
        dispatch(getCartCount(user?.id as string) as any);
      } else {
        toast({
          title: "Xóa sản phẩm thất bại",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Đã có lỗi xảy ra",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>

      <div className="flex flex-col gap-4">
        {items?.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center border p-4 rounded-lg"
          >
            <img
              src={item.product.img}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="ml-4 flex-1">
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">
                Nhà cung cấp: {item.product.supplier.name}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-medium text-red-600">
                  {item.product.priceAfterDiscount.toLocaleString("vi-VN")}đ
                </span>
                <span className="text-gray-500 line-through text-sm">
                  {item.product.originalPrice.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <div className="mt-2">Số lượng: {item.quantity}</div>
            </div>
            <button
              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
              title="Xóa sản phẩm"
              onClick={() => handleDeleteCartItem(item.product.id)}
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">Tổng tiền:</span>
          <span className="text-2xl font-bold text-red-600">
            {totalPrice.toLocaleString("vi-VN")}đ
          </span>
        </div>
      </div>
    </div>
  );
}

export default Cart;
