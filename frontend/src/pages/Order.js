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
  Center
} from "@mantine/core";
import axios from "axios";
import { API_URL } from "../constants";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

function Order() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = () => {
    axios
      .get(`${API_URL}order/order-fetch/?user_id=${user?.user_id}`)
      .then((res) => {
        const sortedData = res.data.results.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setOrderData(sortedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(orderData?.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const paginatedItems = orderData?.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container size="" className="custom-container">
      <div style={{ display: 'flex' }}>

      <Card style={{ flex: 1, marginRight: '1rem', padding: '1rem' }}>
      {/* Filter options content here */}
      <Title>Filters</Title>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <Text size="xlg" fz="lg" weight={500} style={{ color: "black", marginBottom: "0.5rem" }} className="mt-3">
      ORDER STATUS
      </Text>
      

      <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
      <input type="checkbox" style={{ marginRight: "1.5rem" }} />
      <Text size="lg">On the way</Text>
    </label>
    <label style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
      <input type="checkbox" style={{ marginRight: "1.5rem" }} />
      <Text size="lg">Delivered</Text>
    </label>
    <label style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
      <input type="checkbox" style={{ marginRight: "1.5rem" }} />
      <Text size="lg">Cancelled</Text>
    </label>
    <label style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
      <input type="checkbox" style={{ marginRight: "1.5rem" }} />
      <Text size="lg">Returned</Text>
    </label>
    </div>
    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
    <Text size="xlg" fz="lg" weight={500} style={{ color: "black", marginBottom: "0.5rem" }} className="mt-3">
      ORDER TIME
      </Text>

      <div style={{ display: "flex", flexDirection: "column" }}>
    <label style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
      <input type="checkbox" style={{ marginRight: "1.5rem" }} />
      <Text size="lg">Last 30 days</Text>
    </label>
    <label style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
      <input type="checkbox" style={{ marginRight: "1.5rem" }} />
      <Text size="lg">2022</Text>
    </label>
    <label style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
      <input type="checkbox" style={{ marginRight: "1.5rem" }} />
      <Text size="lg">2021</Text>
    </label>
    <label style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
      <input type="checkbox" style={{ marginRight: "1.5rem" }} />
      <Text size="lg">2020</Text>
    </label>
    </div>

      {/* ... */}
    </Card>
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
      <div style={{ flex: 4, display: 'flex', flexDirection: 'column' }}>

        {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Orders..."
        style={{
          width: '100%',
          padding: '0.5rem',
          marginBottom: '1rem',
        }}
      />

      {orderData &&
        paginatedItems?.map((item, index) =>
          item?.products?.map((product, index) => (
            <Card key={index} shadow="sm" padding="lg" mt="lg">
  <Card.Section withBorder inheritPadding py="xs">
    <Group position="apart">
      <Image src={product?.image} width={100} height={100} />
      <div className="mt-7">
        <Text size="xl" weight={500} style={{ marginBottom: "0.5rem" }}>
          {product?.name}
        </Text>
        <Text size="lg" fz="lg" style={{ color: "black", marginBottom: "0.5rem" }}>
          Quantity: {product?.quantity}
        </Text>
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
            Cancel
          </Button>
        )}
      </div>
      <div className="mt-3">
        <Text size="lg" style={{ color: "gray" }}>
          
        </Text>
        <Text size="lg" style={{ color: "black" }} className="mt-0" weight={500}>
          ₹{product?.price}
        </Text>
     
      </div>
      <div>
      <div className="text-center">
      <Text size="lg" style={{ color: "gray", marginTop: "1rem" }}>
          Order Date
        </Text>
        <Text size="lg" style={{ color: "gray" }}>
          {dayjs(item?.created_at).format("DD/MM/YYYY")}
        </Text>
        <Text size="lg" style={{ color: "gray" }}>
          Order ID
        </Text>
        <Text size="lg" style={{ color: "gray" }}>
          #{item?.order_id}
        </Text>

      </div>
        <div className="status-badge">
  {product?.cancel && (
    <Badge className="badge-red">
      Cancelled
    </Badge>
  )}
  {product?.cancel === false && (
    <Badge className="badge-green">
      {item?.status}
    </Badge>
  )}
</div>

        
      </div>
    </Group>
  </Card.Section>
</Card>

          ))
        )}
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
      )} </div>
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
      </div>
    </Container>
  );
}

export default Order;
