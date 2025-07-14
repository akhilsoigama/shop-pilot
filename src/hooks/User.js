import axios from "axios";
import useSWRMutation from "swr/mutation";

const postUser = async (url, { arg: token }) => {
  const res = await axios.post("/api/users", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export function useSyncUser() {
  return useSWRMutation("/users", postUser);
}
