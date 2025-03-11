import { useSearchParams } from "react-router-dom";

export const useQuerySearch = () => {
  const [ searchParams ] = useSearchParams();
  const query = searchParams.get("query") || "";
  return query;
}