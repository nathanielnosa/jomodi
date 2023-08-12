import React, { useEffect, useState } from "react";
import {
  Card,
  Text,
  Badge,
  ActionIcon,
  Group,
  Container,
  Image,
  Button,
  Pagination,
  Modal,
  Title,
  Center,
  TextInput
} from "@mantine/core";
import axios from "axios";
import { API_URL } from "../constants";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import OrderFilter from "../components/order/OrderFilter";

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
    <Container size="xl">
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
      <div className="row">
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

        <div className="col-md-9">
          {
            paginatedItems?.length > 0 && (
              <TextInput placeholder="Search" size="xl"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
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

          {paginatedItems?.length > 0 &&
            filteredPaginatedItems?.map((item, index) =>
              item?.products?.map((product, index) => (
                <Card key={index} shadow="sm" padding="lg" mt="xl">
                  <Card.Section withBorder inheritPadding py="xs">
                    <Group position="apart"
                      onClick={() => navigate(`/order-product-summary`, { state: { order: item, product: product } })}>

                      <Image src={product?.image} width={100} height={100} />
                      <Group position="apart">
                        <div>
                          <Text size="lg" style={{ color: "gray" }}>
                            Order Date
                          </Text>
                          <Text size="lg" style={{ color: "gray" }}>
                            {dayjs(item?.created_at).format("DD/MM/YYYY")}
                          </Text>
                        </div>
                        <div>
                          <Text size="lg" style={{ color: "gray" }}>
                            Order ID
                          </Text>
                          <Text size="lg" style={{ color: "gray" }}>
                            #{item?.order_id}
                          </Text>
                        </div>
                        <div>
                          <Text size="lg" style={{ color: "gray" }}>
                            Order Price
                          </Text>
                          <Text size="lg" style={{ color: "gray" }}>
                            ₹{product?.price}
                          </Text>
                        </div>
                      </Group>
                    </Group>
                  </Card.Section>
                  <Group position="apart">
                    <div>
                      <Text size="xl" weight={500} style={{ marginBottom: "1rem" }}>
                        {product?.name}
                      </Text>
                      <Text
                        size="lg"
                        fz="lg"
                        style={{ color: "black", marginBottom: "1rem" }}
                      >
                        Quantity: {product?.quantity}
                      </Text>
                    </div>
                    {item.status === "Shipping in Progress" && (
                      <Button
                        variant="outline"
                        color="red"
                        size="lg"
                        radius="xl"
                        mb="md"
                        style={{ marginRight: "1rem" }}
                        onClick={() => handleOpen(item.id, product.id)}
                        disabled={product?.cancel}
                      >
                        cancel
                      </Button>
                    )}
                  </Group>
                  {product?.cancel && (
                    <Badge fz="xl" p="xl" color="red">
                      Cancelled
                    </Badge>
                  )}
                  {product?.cancel == false && (
                    <Badge fz="xl" p="xl" color="green">
                      {item?.status}
                    </Badge>
                  )}
                </Card>
              ))
            )}
        </div>
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
    </Container >
  );
}

export default Order;
