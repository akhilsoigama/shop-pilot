// src/hooks/useCheckout.js
import useSWRMutation from "swr/mutation";
import axios from "axios";

async function checkoutFetcher(url, { arg }) {
  const { items, customerEmail } = arg;
  const { data } = await axios.post(url, { items, customerEmail });
  return data; 
}

export default function useCheckout() {
  const { trigger, isMutating, error } = useSWRMutation(
    "/api/checkout",
    checkoutFetcher
  );

  return {
    checkout: trigger,
    loading: isMutating,
    error,
  };
}
