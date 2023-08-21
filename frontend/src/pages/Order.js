import React, { useEffect, useState } from "react";
import {
  Card,
  Text,
  Badge,
  ActionIcon,
  Group,
  Container,
  Image,
  Grid,
  SimpleGrid,
  Button,
  Notification,
  Pagination,
  Modal,
  Title,
  Center,
  CardSection,
  TextInput
} from "@mantine/core";
import axios from "axios";
import { API_URL } from "../constants";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { IconCheck, IconX, IconPointFilled } from '@tabler/icons-react';
import OrderFilter from "../components/order/OrderFilter";
import SearchBar from "../components/search/SearchBar";

function Order() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState([]);
  const [selectedOrderTime, setSelectedOrderTime] = useState([]);
  const [keyword, setKeyword] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = () => {
    axios
      .get(`${API_URL}order/order-fetch/?user_id=${user?.user_id}`)
      .then((res) => {
        // const sortedData = res.data.results.sort(
        //   (a, b) => new Date(b.created_at) - new Date(a.created_at)
        // );
        setOrderData(res.data.results);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(orderData);


  const handleOpen = (orderId, productId) => {
    setSelectedOrder(orderId);
    setSelectedProduct(productId);
    setShowModal(true);
  };


  const handleClose = () => {
    setSelectedOrder(null);
    setSelectedProduct(null);
    setShowModal(false);
  };

  const handleCancel = (orderId, productId) => {
    // Find the target order from orderData
    const targetOrder = orderData.find((order) => order.id === orderId);

    if (!targetOrder) {
      // Order not found in orderData, handle the error appropriately
      console.log("Order not found!");
      return;
    }

    // Find the target product within the order
    const targetProduct = targetOrder.products.find(
      (product) => product.id === productId
    );

    if (!targetProduct) {
      // Product not found in the order, handle the error appropriately
      console.log("Product not found in the order!");
      return;
    }

    // Update the 'cancel' property of the target product
    targetProduct.cancel = true;

    // Send the updated order data to the server using axios.patch
    axios
      .patch(`${API_URL}order/order/${orderId}/`, {
        products: targetOrder.products,
      })
      .then((res) => {
        console.log(res.data);

        // Update the orderData state to reflect the changes
        const updatedOrderData = orderData.map((order) =>
          order.id === orderId
            ? { ...order, products: targetOrder.products }
            : order
        );
        setOrderData(updatedOrderData);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredOrders = orderData?.filter((order) => {
    const statusMatch =
      selectedOrderStatus.length === 0 ||
      (selectedOrderStatus == 'Cancelled' && order?.cancel) ||
      (selectedOrderStatus == ('Delivered') && order?.delivered) ||
      (selectedOrderStatus == ('Out for delivery') && order?.out_for_delivery) ||
      (selectedOrderStatus == ('Shipped') && order?.shipped) ||
      (selectedOrderStatus == ('Returned') && order?.returned);

    const timeMatch =
      selectedOrderTime.length === 0 ||
      selectedOrderTime.some((selectedTime) => {
        const currentTime = new Date(); // Current date
        const orderCreatedAt = new Date(order?.created_at); // Order creation date

        switch (selectedTime) {
          case 'Last 7 days':
            return (currentTime - orderCreatedAt) / (1000 * 60 * 60 * 24) <= 7;
          case 'Last 30 days':
            return (currentTime - orderCreatedAt) / (1000 * 60 * 60 * 24) <= 30;
          case 'Last 60 days':
            return (currentTime - orderCreatedAt) / (1000 * 60 * 60 * 24) <= 60;
          case 'Last 90 days':
            return (currentTime - orderCreatedAt) / (1000 * 60 * 60 * 24) <= 90;
          default:
            return false;
        }
      });

    return selectedOrderStatus.length === 0 && selectedOrderTime.length === 0
      ? true
      : statusMatch && timeMatch;
  });


  console.log(filteredOrders)

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = filteredOrders.length === 0 ? Math.ceil(orderData?.length / itemsPerPage)
    : Math.ceil(filteredOrders?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


  const paginatedItems = filteredOrders.length === 0
    ? orderData?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : filteredOrders?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const filteredPaginatedItems = paginatedItems?.map((item) => {
    const filteredProducts = keyword
      ? item.products.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      )
      : item.products;

    return {
      ...item,
      products: filteredProducts,
    };
  });


  return (
    <div size="xl" className="py-3 px-9">
      <Modal opened={showModal} onClose={handleClose} size="40%"
        title="Cancel Order">
        <Center>
          <Title order={2} m="lg">Are you sure you want to cancel this order?</Title>
        </Center>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outline"
            color="red"
            size="lg"
            radius="xl"
            mb="md"
            style={{ marginRight: "1rem" }}
            onClick={() => handleCancel(selectedOrder, selectedProduct)}
          >
            Yes
          </Button>
          <Button
            variant="outline"
            color="teal"
            size="lg"
            radius="xl"
            mb="md"
            style={{ marginRight: "1rem" }}
            onClick={() => handleClose()}
          >
            No
          </Button>
        </div>
      </Modal>
      <Grid mt={8}>
            <Grid.Col span={12}>
                        
                        <nav class="flex" aria-label="Breadcrumb">
                          <ol class="inline-flex items-center space-x-1 md:space-x-3">
                            <li class="inline-flex items-center">
                              <a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                </svg>
                                <Text size={20} weight={400}>Home</Text>
                              </a>
                            </li>
                            <li>
                              <div class="flex items-center">
                                <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <a href="/profile" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"> <Text size={20} weight={400}>My Account</Text></a>
                              </div>
                            </li>
                            
                            <li aria-current="page">
                              <div class="flex items-center">
                                <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                </svg>
                                <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"> <Text size={20} weight={400}>My orders</Text></span>
                              </div>
                            </li>
                          </ol>
                        </nav>
                        
                        
                                            </Grid.Col>
            </Grid>
      <Grid>
        <Grid.Col md={2} >
          {
            paginatedItems?.length > 0 && (
              <OrderFilter
                selectedOrderStatus={selectedOrderStatus}
                setSelectedOrderStatus={setSelectedOrderStatus}
                selectedOrderTime={selectedOrderTime}
                setSelectedOrderTime={setSelectedOrderTime}
              />
            )
          }
          

              {
                (filteredOrders && selectedOrderStatus != 'All' && filteredOrders?.length === 0) && (
                  <Text size={40} fw="bold" style={{ color: "gray" }}>
                    No Orders for this Status
                  </Text>
                )

              }


        </Grid.Col>

        <Grid.Col md={10}>

        <div className="px-3">

        {/* Search Bar */}
        <SearchBar/>
      
      
      


      

      {orderData &&
        filteredPaginatedItems?.map((item, index) =>
          item?.products?.map((product, index) => (
            <Card key={index} shadow="sm" padding="lg" mt="lg" className="px-5">
              <div>
              <CardSection withBorder inheritPadding py="xs">
              <Grid>
              <Grid.Col md={4} className="flex items-center">
                <div onClick={() => navigate(`/order-product-summary`, { state: { order: item, product: product } })}>
                <Image src={product?.image} width={150} height={150} className="m-4" />
                </div>
  
  <div className="mt-7 ml-4">
    <Text size="xl" weight={500} style={{ marginBottom: '0.5rem' }}>
      {product?.name}
    </Text>
    <Text size="lg" fz="lg" style={{ color: 'black', marginBottom: '0.5rem' }}>
      Quantity: {product?.quantity}
    </Text>
    {item.status === 'Shipping in Progress' && (
      <Button
        variant="outline"
        color="red"
        size="lg"
        radius="xl"
        mb="md"
        style={{ marginRight: '1rem' }}
        onClick={() => handleOpen(item.id, product.id)}
        disabled={product?.cancel}
      >
        Cancel
      </Button>
    )}
  </div>
  
</Grid.Col>

            <Grid.Col md={3}>
            <div className="mt-7" onClick={() => navigate(`/order-product-summary`, { state: { order: item, product: product } })}>
        <Text size="lg" style={{ color: "gray" }}>
          
          
        </Text>
        <Text size="lg" style={{ color: "gray" }}>
         
          
        </Text>
        <Text size="lg" style={{ color: "black" }} className="mt-0 text-center" weight={500}>
          ₹{product?.price * product?.quantity}
        </Text>
     
      </div>
            </Grid.Col>
                <Grid.Col md={4}>
                        
                    <div className="mt-7 mx-12" onClick={() => navigate(`/order-product-summary`, { state: { order: item, product: product } })}>
              {product?.cancel && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconPointFilled color="red" title="" style={{ color: 'red', marginRight: '0.5rem' }} />
                Cancelled
              
              
                
              </div>
              )}
              {product?.cancel === false && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconPointFilled color="green" title="" style={{ color: 'green', marginRight: '0.5rem' }} />
              {item?.status}
            

              
            </div>


            )}


            </div>
              </Grid.Col>
              </Grid>

              </CardSection>
              </div>
</Card>

          ))
        )}
        </div>
      {orderData?.length === 0 && (
        <Card shadow="sm" padding="lg" mt="xl">
          <Card.Section withBorder inheritPadding py="xs" className="text-center">
            <Group position="apart">
              <Text size="xl" fz="xl" fw="bold" style={{ color: "gray" }}>
                No Orders
              </Text>
            </Group>
            <Button
              variant="outline"
              color="teal"
              size="lg"
              radius="xl"
              style={{ marginRight: "1rem" }}
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
          </Card.Section>

        </Card>
      )}
      <Group spacing={5} position="right">
        <Pagination
          my="lg"
          total={totalPages}
          value={page}
          onChange={handlePageChange}
          color="red"
          style={{
            display: "flex",
            fontSize: "1.6rem",
          }}
        />
      </Group>     
        </Grid.Col>

      </Grid>
    </div >
  );
}

export default Order;
