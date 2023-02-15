import { Input, InputGroup, InputRightElement, Icon } from "@mantine/core";
import React from "react";
import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";

export default function PasswordInput() {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md" w="35%">
      <Input
        variant="filled"
        placeholder="Mot de passe"
        bgColor="#333645"
        color="#7B849A"
        autoComplete="off"
        _hover={{
          bgColor: "#333645",
        }}
        _active={{ bgColor: "#333645" }}
        _focus={{ bgColor: "#333645" }}
        type={show ? "text" : "password"}
      />
      <InputRightElement
        color="#7B849A"
        onClick={handleClick}
        _hover={{
          cursor: "pointer",
        }}
      >
        <Icon as={BsFillEyeFill} />
      </InputRightElement>
    </InputGroup>
  );
}
