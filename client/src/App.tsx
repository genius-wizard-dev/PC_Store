import { useToast } from "@/hooks/use-toast";
import MainLayout from "@/layouts/MainLayout";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageRender from "./config/routers/PageRender";
import { Home, Login, Register } from "./pages";
import { clearAuth } from "./redux/slices/auth";
import { RootState } from "./redux/store";
import { checkTokenValid } from "./redux/thunks/auth";
import { getCartCount } from "./redux/thunks/cart";
import { viewOrder } from "./redux/thunks/order";
import { getUserInfo } from "./redux/thunks/user";

function App() {
  const { isLogin, token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  useEffect(() => {
    const checkAuth = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const { payload } = await dispatch(checkTokenValid(token) as any);

        if (payload.result.valid) {
          const { payload: userPayload } = await dispatch(
            getUserInfo({ token }) as any
          );

          if (userPayload.result) {
            await Promise.all([
              dispatch(
                getCartCount({ userId: userPayload.result.id, token }) as any
              ),
              dispatch(
                viewOrder({ userId: userPayload.result.id, token }) as any
              ),
            ]);
          }
        }
      } catch (error) {
        toast({
          title: "Phiên đăng nhập đã hết hạn",
          description: "Vui lòng đăng nhập lại",
          variant: "destructive",
        });
        setTimeout(() => {
          dispatch(clearAuth() as any);
          window.location.href = "/login";
        }, 1000);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token, dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <Loader2 className="h-12 w-12 animate-spin text-orange-500 mb-4" />
        <div className="text-lg font-semibold text-gray-700 animate-pulse">
          Đang tải...
        </div>
        <div className="mt-2 text-sm text-gray-500 animate-fade-in">
          Vui lòng chờ trong giây lát
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isLogin ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isLogin ? <Navigate to="/" replace /> : <Register />}
        />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/:page" element={<PageRender />} />
          <Route path="/:page/:id" element={<PageRender />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
