import { useToast } from "@/hooks/use-toast";
import { clearAllState } from "@/redux/slices";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/thunks/auth";
import { LogIn, Monitor, ShoppingCart, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { isLogin, token } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userModalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { cartCount } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userModalRef.current &&
        !userModalRef.current.contains(event.target as Node)
      ) {
        setShowUserModal(false);
      }
    };

    if (showUserModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserModal]);

  const handleLogout = async () => {
    try {
      const result = await dispatch(logout(token as string) as any);
      if (result.payload.code === 1000) {
        toast({
          title: "Đăng xuất thành công",
        });
        dispatch(clearAllState() as any);
        navigate("/");
      } else {
        toast({
          title: "Đăng xuất thất bại",
        });
      }
    } catch (error) {
      toast({
        title: "Đăng xuất thất bại",
      });
    }
  };

  return (
    <>
      <header
        className="flex justify-center items-center text-white fixed w-full top-5 z-50 shadow-lg max-w-[90%] max-h-16 rounded-full backdrop-blur-md"
        style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
      >
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            {/* <div className="w-10 h-10 p-2 rounded-full cursor-pointer hover:ring-2 hover:ring-orange-400 hover:scale-110 transition-all text-white bg-orange-500/20 flex items-center justify-center"> */}
            <Monitor className="h-7 w-7 text-white cursor-pointer hover:scale-110 transition-all" />
            {/* </div> */}

            <div className="hidden md:flex items-center space-x-10">
              <Link
                className="text-base font-medium hover:text-[#f76808] transition-all hover:scale-110"
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-base font-medium hover:text-[#f76808] transition-all hover:scale-110"
                to="#"
              >
                About
              </Link>
              <Link
                className="text-base font-medium hover:text-[#f76808] transition-all hover:scale-110"
                to="/product"
              >
                Products
              </Link>
              <Link
                className="text-base font-medium hover:text-[#f76808] transition-all hover:scale-110"
                to="#"
              >
                Support
              </Link>
              <Link
                className="text-base font-medium hover:text-[#f76808] transition-all hover:scale-110"
                to="#"
              >
                Contact
              </Link>
            </div>

            {isLogin ? (
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Link
                    to="/cart"
                    className={`w-10 h-10  rounded-full cursor-pointer hover:ring-2 hover:ring-orange-400 hover:scale-105 transition-all  ${
                      cartCount == 0
                        ? "bg-orange-500/10"
                        : "bg-gradient-to-br from-orange-400 to-orange-600"
                    }  flex items-center justify-center shadow-md `}
                  >
                    <ShoppingCart className="h-5 w-5 text-white" />
                  </Link>
                  {cartCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-medium rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                      {cartCount > 99 ? "99+" : cartCount}
                    </div>
                  )}
                </div>
                <div className="relative" ref={userMenuRef}>
                  <div
                    className="w-10 h-10 p-2 rounded-full cursor-pointer hover:ring-2 hover:ring-orange-400 hover:scale-110 transition-all text-white bg-orange-500/20 flex items-center justify-center"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <User className="h-7 w-7 text-white" />
                  </div>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 animate-in fade-in slide-in-from-top-2 duration-300">
                      <button
                        onClick={() => {
                          setShowUserModal(true);
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 transition-colors duration-200"
                      >
                        Thông tin cá nhân
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 transition-colors duration-200"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-md hover:from-orange-600 hover:to-orange-700 active:from-orange-700 active:to-orange-800 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Đăng nhập</span>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div
            ref={userModalRef}
            className="bg-white rounded-xl p-8 w-[450px] relative shadow-2xl transform transition-all duration-300 hover:scale-[1.02]"
          >
            <button
              onClick={() => setShowUserModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="bg-orange-500/10 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-8 h-8 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Thông tin người dùng
              </h2>
            </div>

            <div className="space-y-4 bg-orange-50/50 p-6 rounded-lg">
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <span className="font-medium text-gray-600 min-w-[120px]">
                  Họ tên:
                </span>
                <span className="text-gray-800">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <span className="font-medium text-gray-600 min-w-[120px]">
                  Email:
                </span>
                <span className="text-gray-800">{user?.email}</span>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <span className="font-medium text-gray-600 min-w-[120px]">
                  Số điện thoại:
                </span>
                <span className="text-gray-800">{user?.phoneNumber}</span>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <span className="font-medium text-gray-600 min-w-[120px]">
                  Tên đăng nhập:
                </span>
                <span className="text-gray-800">{user?.userName}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
