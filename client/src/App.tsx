import MainLayout from "@/layouts/MainLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageRender from "./config/routers/PageRender";
import { Home, Login, Register } from "./pages";
import { RootState } from "./redux/store";
import { checkTokenValid } from "./redux/thunks/auth";
import { getCartCount } from "./redux/thunks/cart";
import { getUserInfo } from "./redux/thunks/user";
function App() {
  const { isLogin, token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const { payload } = await dispatch(checkTokenValid(token) as any);

        if (payload.result.valid) {
          const { payload: userPayload } = await dispatch(getUserInfo() as any);

          if (userPayload.result) {
            await dispatch(getCartCount(userPayload.result.id) as any);
          }
        }
      } catch (error) {
        console.error("Lỗi xác thực:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch, token]);

  if (loading) {
    return null;
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
          {/* <Route path="/:page/service/:serviceId" element={<ListAdrverByService />} />
          <Route path="/registeradvertisement" element={<RegisterAdvertisement />} />
          <Route path="dvhn/search" element={<SearchPage/>} />
          <Route path="/advertisement-success" element={<AdvertisementSuccess />} /> */}
        </Route>
        {/* Các routes khác */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
