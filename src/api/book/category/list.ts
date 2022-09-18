import { useSnackbar } from "notistack";
import { useRecoilValue } from "recoil";
import useSWR from "swr";
import Config from "../../../../config";
import { useChoseClient } from "../../../store/choseClient";
import { useMe } from "../../../store/me";

const useBooks = () => {
  const { enqueueSnackbar } = useSnackbar();
  const me = useRecoilValue(useMe);
  const choseClient = useRecoilValue(useChoseClient);
  const endpoint = `${Config.apiOrigin}/api/${choseClient.clientId}/bookCategories`;
  const fetcher = (endpoint: string) =>
    fetch(endpoint, {
      headers: { Accept: "application/json", Authorization: `Bearer ${me.apiToken}` },
    }).then((res) => {
      if (!res.ok) {
        if (res.status === 402) {
          enqueueSnackbar(`ユーザは指定されたワークスペースに所属していません`, {
            variant: "error",
          });
        } else {
          enqueueSnackbar(`ユーザーの取得に失敗しました`, {
            variant: "error",
          });
        }
      }
      return res.json();
    });

  const { data, error, isValidating, mutate } = useSWR(endpoint, fetcher, {
    revalidateOnFocus: false,
  });

  const loading = isValidating || (!data && !error);
  const response = !loading && !error ? (data as any) : null;

  return {
    loading,
    error,
    response,
    mutate,
  };
};

export default useBooks;
