import { NotFound } from "@/pages";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";

const pages: any = import.meta.glob("../../pages/**/*.tsx");

const PageRender: React.FC = () => {
  const { page, id } = useParams<{ page: string; id: string }>();
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const { isLogin } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const loadComponent = async () => {
      if (page) {
        const formatPage = page.charAt(0).toUpperCase() + page.slice(1);
        const pagePath = id
          ? `../../pages/${formatPage}/[id].tsx`
          : `../../pages/${formatPage}.tsx`;

        if (!isLogin && pagePath.includes("Cart")) {
          setNotFound(true);
          setComponent(null);
        } else {
          const module = await pages[pagePath]();
          setComponent(() => module.default);
          setNotFound(false);
        }
      } else {
        setNotFound(true);
        setComponent(null);
      }
    };

    loadComponent();
  }, [page, id]);

  if (notFound) return <NotFound />;
  if (Component) return <Component />;

  return null;
};

export default PageRender;
