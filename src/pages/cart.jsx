import { getCartData } from "@/redux/cartSlice";
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getData } from "@/redux/cartSlice";
import {RxCross2} from "react-icons/rx"
import { CloseIcon } from "@chakra-ui/icons";



let cartData = [];
const Cart = () => {
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.cart);

  
  // const [,setCartData] = useState([])
  const quantityDec = (id) => {
    let filteredData = data.filter((item) => {
      if(item.id == id){
        return {...item,quantity:item.quantity}
      }
      return item
    })
    dispatch(getData(filteredData))
  };
  const quantityInc = () => {
      // data.quantity++
  };

  // getCartData(dispatch)
  useEffect(() => {
    axios
      .get("http://localhost:8080/cart")
      .then((res) => dispatch(getData(res.data)));
  }, []);
  if (data.length == 0) {
    return (
      <Box margin="auto" maxW="75%" border="1px red solid" h={100}>
        <Text fontSize={25}> There are no items in your basket. </Text>
        <Button p={4} mt={2}>
          {" "}
          CONTINUE SHOPPING{" "}
        </Button>
      </Box>
    );
  }
  return (
    <div>
      <Container mt={40} maxW="75%" border="1px red solid">
        <Box  >
          <h4
            style={{
              fontFamily: "sans-serif",
              padding: "5px",
              marginLeft: "7px",
            }}
          >
            {" "}
            Your Basket{" "}
          </h4>
        </Box>
        <hr
          className="horizontal-row"
          style={{ width: "90%", marginLeft: "10px" }}
        />
        <Box display="flex" flexDirection="column" h="60px" padding={2}>
          <Box border="1px yellow solid" width="25%" p="4px">
            <Text fontFamily="sans-serif" ml={6} fontSize={12}>
              {" "}
              VIEW AVAILABLE PROMOS{" "}
            </Text>
          </Box>
        </Box>

        <Box
          border="1px red solid"
          bg="#555555"
          display="flex"
          justifyContent="space-between"
          pl={20}
          h={12}
          alignItems="center"
          color="white"
        >
          <Box>
            <p>ITEM DESCRIPTION</p>
          </Box>

          <Box border="1px red solid" display="flex" gap="80px">
            <Text>UNIT PRICE</Text>
            <Text>QUANTITY</Text>
            <Text>SUBTOTAL</Text>
            <Text>SAVINGS</Text>
          </Box>
        </Box>
        {data.map((item) => (
          <Box
            key={item.id}
            display="flex"
            justifyContent="space-between"
            pl={20}
            h={12}
            alignItems="center"
            bg="#4444"
            mt={2}
          >
            <Box>
              <p>{item.product}</p>
            </Box>

            <Box  display="flex" width="55%">
              <Text mr={110}>{item.price}</Text>
              <Box mr={110} display="flex" flexDirection="row">
                <Button onClick={() => quantityDec(item.id)} size="xs" mr={2}>
                  -
                </Button>{" "}
                <p>{item.quantity}</p>{" "}
                <Button onClick={quantityInc} ml={2} size="xs">
                  +
                </Button>
              </Box>
              <Text >0</Text>
              <CloseIcon ml={12} boxSize={3} mt={1.5} mr={16} />
              <Text>0</Text>
            </Box>
          </Box>
        ))}
        <Box display="flex" justifyContent="space-between">
          <Box
            mt={10}
            border="1px red solid"
            h={300}
            display="flex"
            flexDirection={"column"}
            justifyContent="space-between"
            width={300}
          >
            <Button m={5}>EMPTY BASKET</Button>
            <Button m={5}> CONTINUE SHOPPING </Button>
          </Box>
          <Box></Box>
          <Box border="1px red solid" w={300} h={300} mt={10}>
            <Text bg="#4444" m={4} textAlign="center">
              {" "}
              Sub Total({data.quantity} items ){" "}
            </Text>
            <p></p>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Cart;
