import { useEffect, useState } from "preact/hooks";

const useMobileScreenCheck = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        }
    }, []);
    return (width <= 768);
}

export default useMobileScreenCheck;
