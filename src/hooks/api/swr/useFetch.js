import fetcher from "./fetcher";
import useSWR from "swr";

function useFetch({ url }) {
  const { data, error, mutate, isValidating } = useSWR(url, fetcher);
  
  return { data, error, mutate, isValidating };
}
export default useFetch;
