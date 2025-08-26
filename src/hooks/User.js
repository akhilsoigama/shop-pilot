import axios from "axios";
import useSWR from "swr";

// GET users
const getUsers = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

export function useUsers() {
  return useSWR("/api/users", getUsers);
}

// POST user (sync)
export const postUser = async (url, token) => {
  const res = await axios.post(url, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};



