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
  Box,
  Title,
  Center
} from "@mantine/core";
import axios from "axios";
import { API_URL } from "../constants";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

function OrderDetailPage() {
  // Define your state variables and fetch order data here

  return (
    <Container size="" className="custom-container">
      
    </Container>
  );
}

export default OrderDetailPage;