import fetcher from "./fetcher";
import useSWR from "swr";

function useFetch({ url }) {
  const { data, error } = useSWR(url, fetcher);
  return { data, error };
}
export default useFetch;
