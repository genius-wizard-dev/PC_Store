import { ENDPOINTS } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { RootState } from "@/redux/store";
import { addToCart, getCartCount } from "@/redux/thunks/cart";
import { get } from "@/services/api.service";
import { Product, ProductResponse } from "@/types";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
function ProductPage() {
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortType, setSortType] = useState<"asc" | "desc" | "all" | "">("");
  const dispatch = useDispatch();
  const { isLogin, token } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    fetchProducts();
  }, [page, sortType]);
  const fetchProducts = async () => {
    let url = `${ENDPOINTS.LIST_PRODUCT}?page=${page}`;
    if (sortType) {
      url = `${ENDPOINTS.LIST_PRODUCT}/${sortType}?page=${page}`;
    }
    const response = await get<{ result: ProductResponse }>(url);
    setProducts(response.data.result.content);
    setTotalPages(response.data.result.totalPages);
  };
  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handleSort = (type: "asc" | "desc" | "all") => {
    if (type == "all") {
      fetchProducts();
      setSortType(type);
      return;
    }
    setSortType(type);
    setPage(0);
  };

  const handleAddCart = async (product: Product) => {
    if (!isLogin) {
      navigate("/login");
      toast({
        title: "Vui lòng đăng nhập để thêm vào giỏ hàng",
      });
      return;
    }
    try {
      await dispatch(
        addToCart({
          userId: user?.id as string,
          productId: product.id,
          token: token as string,
        }) as any
      );
      toast({
        title: "Thêm vào giỏ hàng thành công",
      });
      dispatch(
        getCartCount({
          userId: user?.id as string,
          token: token as string,
        }) as any
      );
    } catch (error) {
      toast({
        title: "Thêm vào giỏ hàng thất bại",
      });
    }
  };

  const handleSearch = async () => {
    setSortType("");
    if (search.trim() == "") fetchProducts();
    else {
      setPage(0);
      const response = await get<{ result: ProductResponse }>(
        `${ENDPOINTS.LIST_PRODUCT}/${search}?page=${page}`
      );
      setProducts(response.data.result.content);
      setTotalPages(response.data.result.totalPages);
    }
  };
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center gap-2 mb-6 text-gray-600">
        <Link to="/" className="hover:text-orange-500">
          Trang chủ
        </Link>
        <span>/</span>
        <span className="text-orange-500">Danh sách sản phẩm</span>
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Nhập nội dung cần tìm kiếm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-[0.58rem] border border-orange-300 rounded-lg bg-white shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Search size={20} />
          </button>
        </div>
        <select
          className="px-4 py-2 border rounded-lg bg-white shadow-sm"
          onChange={(e) => handleSort(e.target.value as "asc" | "desc" | "all")}
          value={sortType}
        >
          <option value="">Sắp xếp theo giá</option>
          <option value="asc">Giá tăng dần</option>
          <option value="desc">Giá giảm dần</option>
          <option value="all">Tất cả</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="group bg-white border rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <Link to={`/product/${product.id}`}>
              <div className="relative">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-52 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                  -{product.discountPercent.toFixed(1)}%
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                {product.name}
              </h3>

              <div className="mt-2 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-red-600 font-bold text-xl">
                    {product.priceAfterDiscount.toLocaleString()}đ
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    {product.originalPrice.toLocaleString()}đ
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Nhà cung cấp:</span>
                    <span>{product.supplier.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Địa chỉ:</span>
                    <span className="line-clamp-1">
                      {product.supplier.address}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            <div className="mt-3 flex justify-end">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                onClick={() => handleAddCart(product)}
              >
                Mua ngay
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-8 gap-2">
        <button
          onClick={handlePrevPage}
          disabled={page === 0}
          className={`p-2 rounded-full flex items-center justify-center ${
            page === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-orange-50 text-orange-600 hover:bg-orange-100"
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              page === index
                ? "bg-orange-600 text-white"
                : "bg-orange-50 text-orange-600 hover:bg-orange-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          disabled={page === totalPages - 1}
          className={`p-2 rounded-full flex items-center justify-center ${
            page === totalPages - 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-orange-50 text-orange-600 hover:bg-orange-100"
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default ProductPage;
