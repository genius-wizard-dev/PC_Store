import { NotFound } from "@/pages";
import { RootState } from "@/redux/store";
import { checkTokenValid } from "@/redux/thunks/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const pages: any = import.meta.glob("../../pages/**/*.tsx");

// Pages that require authentication
const PROTECTED_PAGES = ["Cart", "Order", "Profile"];

const PageRender: React.FC = () => {
  const { page, id } = useParams<{ page: string; id: string }>();
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const { isLogin, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    if (token) {
      dispatch(checkTokenValid(token) as any);
    }

    const loadComponent = async () => {
      if (!page) {
        setNotFound(true);
        setComponent(null);
        return;
      }

      try {
        const formatPage = page.charAt(0).toUpperCase() + page.slice(1);
        let pagePath = `../../pages/${formatPage}.tsx`;

        // Determine the correct page path
        if (id) {
          pagePath = `../../pages/${formatPage}/[id].tsx`;
        } else if (formatPage === "Vnpay" && searchParams.get("vnp_ResponseCode")) {
          pagePath = `../../pages/${formatPage}/PaymentResult.tsx`;
        }

        // Check if page exists
        if (!pages[pagePath]) {
          setNotFound(true);
          setComponent(null);
          return;
        }

        // Check authentication for protected pages
        if (!isLogin && PROTECTED_PAGES.includes(formatPage)) {
          navigate("/login", { 
            replace: true,
            state: { from: location.pathname }
          });
          return;
        }

        // Load the component
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
  }, [page, id, token, isLogin, dispatch, location.pathname, location.search, navigate]);

  if (notFound) return <NotFound />;
  if (Component) return <Component />;

  // Loading state could be added here
  return null;
};

export default PageRender;
