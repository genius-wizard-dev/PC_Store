import MainLayout from "@/layouts/MainLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageRender from "./config/routers/PageRender";
import { Home, Login, Register } from "./pages";
import { RootState } from "./redux/store";
import { checkTokenValid } from "./redux/thunks/auth";
import { getUserInfo } from "./redux/thunks/user";
function App() {
  const { isLogin, token, status } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        const result = await dispatch(checkTokenValid(token) as any);
        if (result.payload.result.valid) {
          await dispatch(getUserInfo() as any);
        }
      }
    };

    checkAuth();
  }, [dispatch, token]);

  if (status === "loading") {
    return null; // hoặc loading spinner
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
