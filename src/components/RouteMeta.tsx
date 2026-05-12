import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getRouteMeta } from "@/lib/routeMeta";

/** Default document title and meta description per route; pages may override with their own <Helmet>. */
const RouteMeta = () => {
  const { pathname } = useLocation();
  const { title, description } = getRouteMeta(pathname);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default RouteMeta;
