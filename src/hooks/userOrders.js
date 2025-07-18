import axios from "axios";
import { useMemo } from "react";
import useSWR from "swr";
import { toast } from "react-hot-toast";

// Configure a single Axios instance for consistent settings
const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Cache-Control": "no-cache",
  },
});

const fetcher = async (url) => {
  try {
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export function useOrders() {
  const {
    data,
    error,
    isValidating,
    mutate,
  } = useSWR("/api/orders", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    refreshInterval: 30000, 
    shouldRetryOnError: true,
    errorRetryInterval: 5000,
  });

  const createOrder = async (orderData) => {
    try {
      const optimisticData = [...(data?.orders || []), { ...orderData, _id: "temp", isOptimistic: true }];
      mutate(optimisticData, false);

      const res = await api.post("/api/orders", orderData);
      toast.success("Order created successfully");
      mutate();
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create order");
      mutate(); 
      throw err;
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await api.delete(`/api/orders/${orderId}`);
      toast.success("Order cancelled");
      mutate();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel order");
      throw err;
    }
  };

  return useMemo(() => ({
    orders: data?.orders || [],
    isLoading: !data && !error,
    isError: error,
    isValidating,
    createOrder,
    cancelOrder,
    mutate,
  }), [data, error, isValidating, mutate]);
}