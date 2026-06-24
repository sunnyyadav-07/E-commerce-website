import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import useCatalog from "../hooks/useCatalog";
import { useSelector } from "react-redux";

const Catalog = () => {
  const { category } = useParams();
  const { getProductsCatalog } = useCatalog();
  const product = useSelector((state) => state.catalog.catalogProducts);
  console.log(product);
  useEffect(() => {
    (async () => {
      await getProductsCatalog(category);
    })();
  }, [category]);
  return <div></div>;
};

export default Catalog;
