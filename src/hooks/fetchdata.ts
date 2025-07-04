import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { supabase } from "../config/supabaseClient";

interface IQuery {
  queryKey: string[];
  table: string;
  select?: string;
}

const useSupabaseQuery = <T>({ queryKey, table, select = "*" }: IQuery): UseQueryResult<T[], Error> => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select(select);
      if (error) throw error;
      return data as T[];
    },
  });
};

export default useSupabaseQuery;