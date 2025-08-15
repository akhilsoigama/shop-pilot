'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
  Button,
} from '@mui/material';
import {
  LocalShipping,
  CheckCircle,
  Cancel,
  AccessTime,
  ArrowForward,
  ShoppingBag
} from '@mui/icons-material';
import LoadingLogo from '../loadingLogo/LoadingLogo';

const OrdersPage = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const orders = [
    {
      id: 'ORD-78945',
      date: '2023-06-15',
      items: 3,
      amount: '₹1,499',
      status: 'shipped',
      tracking: 'DEL-789456123',
      products: [
        { name: 'Boat Wireless Headphones', price: '₹899', quantity: 1, image: '/subcategory/electronics/headphones.png' },
        { name: 'Silicon Phone Case', price: '₹299', quantity: 2, image: '/subcategory/electronics/mobile-phones.png' }
      ]
    },
    {
      id: 'ORD-78946',
      date: '2023-06-14',
      items: 2,
      amount: '₹2,245',
      status: 'delivered',
      tracking: 'DEL-456123789',
      products: [
        { name: 'Noise Smart Watch', price: '₹1,999', quantity: 1, image: '/subcategory/electronics/smart-watches.png' },
        { name: 'Telivision', price: '₹499', quantity: 1, image: '/subcategory/electronics/televisions.png' }
      ]
    },
    {
      id: 'ORD-78947',
      date: '2023-06-10',
      items: 1,
      amount: '₹599',
      status: 'cancelled',
      tracking: '',
      products: [
        { name: 'Cameras', price: '₹599', quantity: 1, image: '/subcategory/electronics/cameras.png' }
      ]
    }
  ];

  setTimeout(() => setIsLoading(false), 1000);

  const statusIcons = {
    shipped: <LocalShipping color="info" />,
    delivered: <CheckCircle color="success" />,
    processing: <AccessTime color="warning" />,
    cancelled: <Cancel color="error" />
  };

  const statusColors = {
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    processing: 'bg-amber-100 text-amber-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
          <LoadingLogo />
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box className="mb-8">
          <Typography variant="h4" className="font-bold  mb-2">
            My Orders
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Your recent purchases and order status
          </Typography>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-6"
      >
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <Paper className="p-5 rounded-xl shadow-sm overflow-hidden border-l-4 border-indigo-500">
              <div className="flex justify-between items-start">
                <div>
                  <Typography variant="subtitle1" className="font-semibold">
                    Order #{order.id}
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    {new Date(order.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </Typography>
                </div>

                <div className="flex items-center space-x-3">
                  <Chip
                    label={order.status}
                    icon={statusIcons[order.status]}
                    className={`${statusColors[order.status]} capitalize font-medium`}
                  />
                  <Typography variant="h6" className="font-bold">
                    {order.amount}
                  </Typography>
                </div>
              </div>

              <Divider className="my-4" />

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="text-gray-400" />
                  <Typography variant="body2">
                    {order.items} {order.items > 1 ? 'items' : 'item'}
                  </Typography>
                </div>

                <Button
                  variant="outlined"
                  endIcon={
                    <motion.div
                      animate={{ x: expandedOrder === order.id ? 5 : 0 }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowForward
                        className={`transition-transform ${
                          expandedOrder === order.id ? 'rotate-90' : ''
                        }`}
                      />
                    </motion.div>
                  }
                  onClick={() => toggleOrderExpand(order.id)}
                  className="border-gray-300"
                >
                  {expandedOrder === order.id ? 'Hide details' : 'View details'}
                </Button>
              </div>

              <AnimatePresence>
                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <Divider className="my-4" />
                    <div className="space-y-4">
                      <Typography variant="subtitle2" className="font-semibold">
                        Ordered Items
                      </Typography>
                      {order.products.map((product, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center space-x-4 py-3 px-3  rounded-lg"
                        >
                          <div className="w-16 h-16 rounded-md overflow-hidden shadow-sm">
                            <motion.img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain"
                              whileHover={{ scale: 1.05 }}
                            />
                          </div>
                          <div className="flex-1">
                            <Typography className="font-medium">
                              {product.name}
                            </Typography>
                            <Typography variant="body2" className="text-gray-500">
                              Qty: {product.quantity}
                            </Typography>
                          </div>
                          <Typography className="font-medium">
                            {product.price}
                          </Typography>
                        </motion.div>
                      ))}
                    </div>

                    {order.tracking && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-5 p-4  rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <LocalShipping className="text-blue-500" />
                          <div>
                            <Typography variant="subtitle2" className="font-semibold">
                              Tracking Number
                            </Typography>
                            <Typography className="font-mono">
                              {order.tracking}
                            </Typography>
                          </div>
                        </div>
                        <motion.div whileHover={{ x: 5 }}>
                          <Button
                            variant="text"
                            color="primary"
                            className="mt-3 pl-0"
                          >
                            Track Package
                          </Button>
                        </motion.div>
                      </motion.div>
                    )}

                    <div className="flex justify-end space-x-3 mt-6">
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Button variant="outlined" className="border-gray-300">
                          Need Help?
                        </Button>
                      </motion.div>
                      {order.status === 'shipped' && (
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          <Button variant="contained" color="primary">
                            Track Order
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Paper>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default OrdersPage;