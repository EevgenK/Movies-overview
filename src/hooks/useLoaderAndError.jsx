import { useState } from "react";

const useLoaderAndError = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return { error, setError, isLoading, setIsLoading };
};

export default useLoaderAndError;
