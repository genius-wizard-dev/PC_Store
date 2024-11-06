import { ENDPOINTS } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/redux/store";
import { deleteCartItem, getCartCount } from "@/redux/thunks/cart";
import { post } from "@/services/api.service";
import {
  Loader2,
  MapPin,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Cart() {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state: RootState) => state.user);
  const { token } = useSelector((state: RootState) => state.auth);
  const [loadingItems, setLoadingItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState("");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    () => {
      const initialQuantities: { [key: string]: number } = {};
      items?.forEach((item) => {
        initialQuantities[item.product.id] = item.quantity;
      });
      return initialQuantities;
    }
  );
  const [isOrdering, setIsOrdering] = useState(false);

  const totalPrice = useMemo(() => {
    return (
      items?.reduce((total, item) => {
        if (!item?.product?.priceAfterDiscount) return total;
        const quantity = quantities[item.product.id] || item.quantity;
        return total + item.product.priceAfterDiscount * quantity;
      }, 0) || 0
    );
  }, [items, quantities]);

  const handleDeleteCartItem = async (productId: string) => {
    try {
      const result = await dispatch(
        deleteCartItem({
          userId: user?.id as string,
          productId,
          token: token as string,
        }) as any
      );
      if (result.payload.code === 1000) {
        toast({
          title: "Xóa sản phẩm thành công",
        });
        dispatch(
          getCartCount({
            userId: user?.id as string,
            token: token as string,
          }) as any
        );
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

  const handleDecreaseQuantity = async (productId: string) => {
    const currentQuantity = quantities[productId];
    if (currentQuantity <= 1) return;

    setLoadingItems((prev) => ({ ...prev, [productId]: true }));
    setQuantities((prev) => ({ ...prev, [productId]: prev[productId] - 1 }));

    try {
      const result = await post<any>(
        `${ENDPOINTS.DECREASE_QUANTITY}?customerId=${user?.id}&productId=${productId}`,
        {},
        token as string
      );
      if (result.data.code !== 1000) {
        setQuantities((prev) => ({
          ...prev,
          [productId]: prev[productId] + 1,
        }));
        toast({
          title: "Giảm số lượng thất bại",
          variant: "destructive",
        });
      }
    } catch (error) {
      setQuantities((prev) => ({ ...prev, [productId]: prev[productId] + 1 }));
      toast({
        title: "Đã có lỗi xảy ra",
        variant: "destructive",
      });
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleIncreaseQuantity = async (productId: string) => {
    setLoadingItems((prev) => ({ ...prev, [productId]: true }));
    setQuantities((prev) => ({ ...prev, [productId]: prev[productId] + 1 }));

    try {
      const result = await post<any>(
        `${ENDPOINTS.INCREASE_QUANTITY}?customerId=${user?.id}&productId=${productId}`,
        {},
        token as string
      );
      if (result.data.code !== 1000) {
        setQuantities((prev) => ({
          ...prev,
          [productId]: prev[productId] - 1,
        }));
        toast({
          title: "Tăng số lượng thất bại",
          variant: "destructive",
        });
      }
    } catch (error) {
      setQuantities((prev) => ({ ...prev, [productId]: prev[productId] - 1 }));
      toast({
        title: "Đã có lỗi xảy ra",
        variant: "destructive",
      });
    } finally {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleOrder = async () => {
    if (!address) {
      toast({
        title: "Vui lòng nhập địa chỉ giao hàng",
        variant: "destructive",
      });
      setShowAddressModal(true);
      return;
    }

    setIsOrdering(true);
    try {
      const result = await post<any>(
        ENDPOINTS.ORDER,
        {
          customerId: user?.id,
          shipAddress: address,
          items,
          totalPrice,
        },
        token as string
      );

      if (result.data.code === 1000) {
        toast({
          title: "Đặt hàng thành công",
        });
        dispatch(
          getCartCount({
            userId: user?.id as string,
            token: token as string,
          }) as any
        );
      } else {
        toast({
          title: "Đặt hàng thất bại",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Hết phiên đăng nhập vui lòng đăng nhập lại",
        variant: "destructive",
      });
      window.location.href = "/login";
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pb-8 relative">
      <div className="flex items-center gap-2 mb-6 text-gray-600">
        <Link to="/" className="hover:text-orange-500">
          Trang chủ
        </Link>
        <span>/</span>
        <span className="text-orange-500">Giỏ hàng</span>
      </div>
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>

      {!items?.length ? (
        <div className="text-center py-8">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">
            Không có sản phẩm trong giỏ hàng
          </p>
        </div>
      ) : (
        <>
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
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecreaseQuantity(item.product.id)}
                        className={`p-1 border rounded hover:bg-gray-100 ${
                          loadingItems[item.product.id] ? "opacity-50" : ""
                        }`}
                        disabled={
                          quantities[item.product.id] <= 1 ||
                          loadingItems[item.product.id]
                        }
                      >
                        <Minus size={16} />
                      </button>
                      <span>{quantities[item.product.id]}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item.product.id)}
                        className={`p-1 border rounded hover:bg-gray-100 ${
                          loadingItems[item.product.id] ? "opacity-50" : ""
                        }`}
                        disabled={loadingItems[item.product.id]}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
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
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <MapPin
                  className="text-gray-500 hover:text-gray-600 transition-colors"
                  size={20}
                />
                <span className="font-medium text-gray-800">
                  Địa chỉ giao hàng:
                </span>
                {address ? (
                  <span className="text-gray-600 truncate max-w-md">
                    {address}
                  </span>
                ) : (
                  <span className="text-red-500 font-medium">
                    Chưa có địa chỉ
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowAddressModal(true)}
                className="text-orange-500 hover:text-orange-600 transition-colors font-medium px-3 py-1 rounded-md hover:bg-orange-50"
              >
                {address ? "Chỉnh sửa" : "Thêm địa chỉ"}
              </button>
            </div>
            <div className="flex justify-between items-center bg-orange-50 p-4 rounded-lg">
              <span className="text-xl font-semibold text-gray-800">
                Tổng tiền:
              </span>
              <span className="text-2xl font-bold text-red-600">
                {totalPrice.toLocaleString("vi-VN")}đ
              </span>
            </div>
          </div>
          <div className="mt-8">
            <button
              onClick={handleOrder}
              disabled={isOrdering || !items?.length}
              className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg shadow transition-colors duration-200 flex items-center justify-center gap-2 ${
                isOrdering ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isOrdering ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ShoppingCart className="w-5 h-5" />
              )}
              <span>{isOrdering ? "Đang xử lý..." : "Tiến hành đặt hàng"}</span>
            </button>
          </div>
        </>
      )}

      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Địa chỉ giao hàng</h2>
            <textarea
              className="w-full p-2 border rounded-lg mb-4 min-h-[100px]"
              placeholder="Nhập địa chỉ giao hàng của bạn"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddressModal(false)}
                className="px-2 py-1 text-gray-600 hover:text-gray-800"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (address.trim()) {
                    setShowAddressModal(false);
                  } else {
                    toast({
                      title: "Vui lòng nhập địa chỉ giao hàng",
                      variant: "destructive",
                    });
                  }
                }}
                className="px-2 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
