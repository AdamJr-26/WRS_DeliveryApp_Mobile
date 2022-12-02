import fetcher from "./fetcher";
import useSWR from "swr";

function useGallons({ url }) {
  const { data: gallons, error: gallonsError } = useSWR(url, fetcher);
  return { gallons, gallonsError };
}
export default useGallons;
