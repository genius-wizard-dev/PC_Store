import { ENDPOINTS } from "@/constants";
import { get } from "@/services/api.service";
import { ProductDetail } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [productDetail, setProductDetail] = useState<ProductDetail>();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await get<{ result: ProductDetail }>(
        `${ENDPOINTS.PRODUCT_DETAIL}/${id}`
      );
      setProductDetail(response.data.result);
    };
    fetchProduct();
  }, []);

  if (!productDetail) return null;
  // console.log(productDetail);
  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="flex items-center gap-2 mb-4 text-gray-600">
        <Link to="/" className="hover:text-orange-500">
          Home
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-orange-500">
          Products
        </Link>
        <span>/</span>
        <span className="text-orange-500">Detail</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-w-16 aspect-h-9">
            {productDetail.images.length > 0 && (
              <img
                src={productDetail.images[0]}
                alt="Sản phẩm"
                className="object-cover rounded-lg"
              />
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {productDetail.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Ảnh ${index + 2}`}
                className="w-full h-20 object-cover rounded-lg cursor-pointer"
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Thông số kỹ thuật</h2>
            <div className="grid grid-cols-1 gap-4">
              {productDetail.processor && (
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">CPU:</span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: productDetail.processor,
                    }}
                  />
                </div>
              )}
              {productDetail.ram && (
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">RAM:</span>
                  <span>{productDetail.ram}</span>
                </div>
              )}
              {productDetail.storage && (
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Ổ cứng:</span>
                  <span>{productDetail.storage}</span>
                </div>
              )}
              {productDetail.graphicsCard && (
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Card đồ họa:</span>
                  <span>{productDetail.graphicsCard}</span>
                </div>
              )}
              {productDetail.powerSupply && (
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Nguồn:</span>
                  <span>{productDetail.powerSupply}</span>
                </div>
              )}
              {productDetail.motherboard && (
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Bo mạch chủ:</span>
                  <span>{productDetail.motherboard}</span>
                </div>
              )}
              {productDetail.case_ && (
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Case:</span>
                  <span>{productDetail.case_}</span>
                </div>
              )}
              {productDetail.coolingSystem && (
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Tản nhiệt:</span>
                  <span>{productDetail.coolingSystem}</span>
                </div>
              )}
              {productDetail.operatingSystem && (
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Hệ điều hành:</span>
                  <span>{productDetail.operatingSystem}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
