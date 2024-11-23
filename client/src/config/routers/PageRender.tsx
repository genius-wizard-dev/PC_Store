import { NotFound } from "@/pages";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const pages: any = import.meta.glob("../../pages/**/*.tsx");

const PUBLIC_PAGES = [
  "Login",
  "Register",
  "NotFound",
  "Home",
  "Product",
  "About",
];
const USER_PAGES = [
  ...PUBLIC_PAGES,
  "Cart",
  "Order",
  "Profile",
  "OrderDetail",
  "Vnpay",
];
const ADMIN_PAGES = [...USER_PAGES, "Admin"];

const PageRender: React.FC = () => {
  const { page, id } = useParams<{ page: string; id: string }>();
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const { isLogin } = useSelector((state: RootState) => state.auth);
  const { info: user } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const loadComponent = async () => {
      if (!page) {
        setNotFound(true);
        setComponent(null);
        return;
      }

      try {
        const formatPage = page.charAt(0).toUpperCase() + page.slice(1);
        let pagePath = `../../pages/${formatPage}.tsx`;
        console.log(formatPage);

        if (id && formatPage !== "Admin") {
          pagePath = `../../pages/${formatPage}/[id].tsx`;
        } else if (
          formatPage === "Vnpay" &&
          searchParams.get("vnp_ResponseCode")
        ) {
          pagePath = `../../pages/${formatPage}/PaymentResult.tsx`;
        } else if (formatPage === "Admin") {
          const subPage = id
            ? id.charAt(0).toUpperCase() + id.slice(1)
            : "Index";
          console.log(subPage);
          pagePath = `../../pages/${formatPage}/${subPage}.tsx`;
        }

        if (!pages[pagePath]) {
          setNotFound(true);
          setComponent(null);
          return;
        }
        const userRole = user?.roles || [{ name: "GUEST" }];

        const allowedPages = userRole.some((role) => role.name === "ADMIN")
          ? ADMIN_PAGES
          : userRole.some((role) => role.name === "USER")
          ? USER_PAGES
          : PUBLIC_PAGES;

        if (
          !PUBLIC_PAGES.includes(formatPage) &&
          !allowedPages.includes(formatPage)
        ) {
          if (!isLogin) {
            navigate("/login", {
              replace: true,
              state: { from: location.pathname + location.search },
            });
            return;
          }
          navigate("/", { replace: true });
          return;
        }

        const module = await pages[pagePath]();
        setComponent(() => module.default);
        setNotFound(false);
      } catch (error) {
        console.error("Error loading page:", error);
        setNotFound(true);
        setComponent(null);
      }
    };

    loadComponent();
  }, [page, id, isLogin, user, location.pathname, location.search, navigate]);

  if (notFound) return <NotFound />;
  if (Component) return <Component />;

  return null;
};

export default PageRender;
