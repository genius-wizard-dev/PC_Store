import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Cpu, Headphones, Monitor } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative h-[90vh] rounded-xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
          alt="Gaming PC setup hiện đại"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white animate-fade-in">
          <h1 className="mb-8 text-6xl font-bold sm:text-7xl md:text-8xl tracking-tight text-white">
            Nâng Tầm{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
              Trải Nghiệm Gaming
            </span>
          </h1>
          <p className="mb-10 max-w-3xl text-xl sm:text-2xl text-white leading-relaxed">
            Khám phá hiệu năng vượt trội với những chiếc PC được tùy chỉnh
            riêng, dành cho cả game thủ và nhà sáng tạo nội dung.
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 rounded-full hover:scale-105 transition-transform bg-white text-black hover:bg-gray-100"
          >
            Khám Phá Ngay
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white ">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-5xl font-bold text-center animate-slide-up">
            Tại Sao Chọn Chúng Tôi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, _) => (
              <Card
                key={feature.title}
                className="text-center animate-slide-up hover:shadow-xl transition-shadow duration-300 border-none bg-white/50 backdrop-blur"
              >
                <CardHeader>
                  <feature.icon className="mx-auto h-16 w-16 text-primary" />
                  <CardTitle className="mt-6 text-2xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-5xl font-bold text-center animate-slide-up">
            Cấu Hình Nổi Bật
          </h2>
          <div className="flex flex-col lg:flex-row items-stretch bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="lg:w-1/2 animate-slide-right">
              <img
                src="https://images.unsplash.com/photo-1587831990711-23ca6441447b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Ultimate Gaming Rig"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:w-1/2 p-12 animate-slide-left flex flex-col justify-center">
              <h3 className="text-4xl font-bold mb-6">Ultimate Gaming Rig</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Trải nghiệm hiệu năng gaming đỉnh cao với Ultimate Gaming Rig,
                trang bị RTX 4080 và CPU Intel i9 mới nhất. Cỗ máy mạnh mẽ này
                được thiết kế để xử lý mọi tựa game và công việc sáng tạo.
              </p>
              <ul className="mb-8 space-y-4">
                <li className="flex items-center text-lg">
                  <ArrowRight className="h-6 w-6 text-primary mr-3" />
                  NVIDIA GeForce RTX 4080 16GB
                </li>
                <li className="flex items-center text-lg">
                  <ArrowRight className="h-6 w-6 text-primary mr-3" />
                  Intel Core i9-13900K
                </li>
                <li className="flex items-center text-lg">
                  <ArrowRight className="h-6 w-6 text-primary mr-3" />
                  32GB DDR5 RAM
                </li>
                <li className="flex items-center text-lg">
                  <ArrowRight className="h-6 w-6 text-primary mr-3" />
                  2TB NVMe SSD
                </li>
              </ul>
              <div className="flex items-center mb-8">
                <span className="text-4xl font-bold text-primary">
                  69.999.000₫
                </span>
                <span className="ml-4 text-2xl font-medium text-gray-500 line-through">
                  79.999.000₫
                </span>
                <span className="ml-4 text-lg text-green-600 font-semibold bg-green-100 px-4 py-1 rounded-full">
                  Tiết kiệm 10tr
                </span>
              </div>
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-xl hover:scale-105 transition-transform"
              >
                Tùy Chỉnh Ngay
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-orange-600 text-white rounded-xl overflow-hidden">
        <div className="container mx-auto px-4 text-center animate-zoom-in">
          <h2 className="mb-8 text-5xl font-bold">
            Sẵn Sàng Xây Dựng PC Trong Mơ?
          </h2>
          <p className="mb-10 max-w-3xl mx-auto text-2xl opacity-90">
            Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn tạo nên
            chiếc PC hoàn hảo phù hợp với nhu cầu và ngân sách.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6 rounded-full hover:scale-105 transition-transform"
          >
            Bắt Đầu Ngay
          </Button>
        </div>
      </section>
    </main>
  );
}

const features = [
  {
    title: "Tùy Chỉnh Hoàn Toàn",
    description:
      "Tự do lựa chọn từng linh kiện theo nhu cầu và sở thích của bạn.",
    icon: Monitor,
  },
  {
    title: "Hiệu Năng Cao Cấp",
    description:
      "Trải nghiệm tốc độ và sức mạnh vượt trội với các linh kiện hàng đầu.",
    icon: Cpu,
  },
  {
    title: "Hỗ Trợ Chuyên Nghiệp",
    description: "Đội ngũ chuyên gia luôn sẵn sàng hỗ trợ bạn 24/7.",
    icon: Headphones,
  },
];
