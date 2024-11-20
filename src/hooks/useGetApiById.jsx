import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetApiById = (callback, arg) => {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!arg) return;
    const getDetails = async () => {
      try {
        setIsLoading(true);
        const result = await callback();
        setDetails(result);
      } catch (err) {
        console.error(err.message);
        toast.error("Something went wrong! Please try again later");
      } finally {
        setIsLoading(false);
      }
    };
    getDetails();
  }, [setIsLoading, callback, arg]);
  return { details, isLoading };
};
export default useGetApiById;
