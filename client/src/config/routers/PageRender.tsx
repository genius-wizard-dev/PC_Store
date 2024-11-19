import { NotFound } from "@/pages";
import { RootState } from "@/redux/store";
import { checkTokenValid } from "@/redux/thunks/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";

const pages: any = import.meta.glob("../../pages/**/*.tsx");

const PageRender: React.FC = () => {
  const { page, id } = useParams<{ page: string; id: string }>();
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const { isLogin, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(checkTokenValid(token) as any);
    }

    const loadComponent = async () => {
      if (page) {
        const formatPage = page.charAt(0).toUpperCase() + page.slice(1);
        const pagePath = id
          ? `../../pages/${formatPage}/[id].tsx`
          : `../../pages/${formatPage}.tsx`;

        if (pages[pagePath]) {
          if (
            !isLogin &&
            (pagePath.includes("Cart") || pagePath.includes("Order"))
          ) {
            window.location.href = "/login";
            return;
          }

          try {
            const module = await pages[pagePath]();
            setComponent(() => module.default);
            setNotFound(false);
          } catch (error) {
            setNotFound(true);
            setComponent(null);
          }
        } else {
          setNotFound(true);
          setComponent(null);
        }
      } else {
        setNotFound(true);
        setComponent(null);
      }
    };

    loadComponent();
  }, [page, id, token, isLogin, dispatch]);

  if (notFound) return <NotFound />;
  if (Component) return <Component />;

  return null;
};

export default PageRender;
