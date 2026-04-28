import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop({ trigger }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname, trigger]); // 👈 añadimos trigger

  return null;
}

export default ScrollToTop;