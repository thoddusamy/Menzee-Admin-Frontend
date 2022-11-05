import { Box, Button, Image, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, useToast } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { BiEdit } from 'react-icons/bi'
import { MdDelete, MdOutlineCancel } from 'react-icons/md'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Api } from '../Config/Api'
import { useContext } from 'react'
import { ContextApi } from '../ContextApi'
import { TiTick } from 'react-icons/ti'

const Tshirts = () => {

    const context = useContext(ContextApi)
    const toast = useToast()

    const fetchProductsData = async () => {
        let { data } = await axios.get(`${Api.url}/products/getproducts`, {
            headers: {
                Authorization: `${localStorage.getItem("menzee_authToken")}`,
            },
        })
        context.setProductsData(data)
    }

    useEffect(() => {
        fetchProductsData()
    }, [])

    // ------------- Delete Single Product -------------
    const handleDeleteSingleProduct = async (id) => {
        try {
            let { data } = await axios.delete(`${Api.url}/products/deleteproduct/${id}`, {
                headers: {
                    Authorization: `${localStorage.getItem("menzee_authToken")}`,
                },
            })
            toast({
                title: data.message,
                status: 'success',
                position: "top-right",
                duration: 3500,
                isClosable: true,
            })
            fetchProductsData()
        } catch (error) {
            console.log(error);
            toast({
                title: error.response.data.message,
                status: 'error',
                position: "top-right",
                duration: 3500,
                isClosable: true,
            })
        }
    }

    return (
        context.productsData && <Box
            display='grid'
            gridTemplateColumns={{ base: "auto", xl: "auto auto auto auto", lg: "auto auto auto", md: "auto auto" }}
            gridColumnGap="35px"
            gridRowGap="25px"
        >
            {
                context.productsData?.map((tees) => {
                    return (
                        tees.prod_category === "tshirts" ? <Box w='auto'
                            maxW='250px'
                            h='auto'
                            maxH='350px'
                            bg='#fcf6f2'
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px"
                            cursor='pointer'
                            key={tees._id}
                        >
                            <Box>
                                <Link to={`/dashboard/details/${tees._id}`}>
                                    <Image w='250px' h='250px' src={tees.prod_img_url1} />
                                </Link>
                                <Box display='flex'
                                    alignItems='center'
                                    justifyContent='center'
                                    overflow='hidden'
                                    w='auto'
                                    maxW='250px'
                                    px={5}
                                    pt={3}
                                >
                                    <Text overflow='hidden'
                                        textOverflow='ellipsis'
                                        whiteSpace='nowrap'
                                        fontWeight='bold'
                                        fontSize='17px'>{tees.prod_name}</Text>
                                </Box>
                                <Box display='flex'
                                    alignItems='center'
                                    justifyContent='space-between'
                                    px={6}
                                >
                                    <Text fontWeight='bold'
                                        fontSize='22px'
                                        py={4}
                                    >₹ {tees.prod_price}</Text>
                                    <Box display='flex'
                                        alignItems='center'
                                        justifyContent='center'
                                        gap='20px'
                                    >
                                        <Tooltip hasArrow label="Edit product" mt={2} placement='top'>
                                            <Box as={Link} to={`/dashboard/editproduct/${tees._id}`}>
                                                <BiEdit fontSize='22px' style={{ marginTop: "3px" }} />
                                            </Box>
                                        </Tooltip>
                                        <Tooltip hasArrow label="Delete product" mt={2} placement='top'>
                                            <Box>
                                                <Menu>
                                                    <MenuButton as={Button} bg="#ff914d" _hover={{ bg: '#ff914d' }}
                                                        _active={{ bg: "#ff914d" }}>
                                                        <MdDelete fontSize='22px' style={{ marginTop: "3px" }} />
                                                    </MenuButton>
                                                    <MenuList textAlign='center' w="100px">
                                                        <Text>Are you sure to delete?</Text>
                                                        <Box display='flex'
                                                            gap={5}
                                                            alignItems='center'
                                                            justifyContent='center' pt={2}>
                                                            <MenuItem as={Button} w="auto" bg="#ff914d"
                                                                _hover={{ bg: '#ff914d' }}
                                                                _focus={{ bg: "#ff914d" }}
                                                                onClick={() => handleDeleteSingleProduct(tees._id)}>
                                                                <TiTick fontSize='25px' />
                                                            </MenuItem>
                                                            <MenuItem as={Button} w="auto" bg="#ff914d"
                                                                _hover={{ bg: '#ff914d' }}
                                                                _focus={{ bg: "#ff914d" }}>
                                                                <MdOutlineCancel fontSize='22px' />
                                                            </MenuItem>
                                                        </Box>
                                                    </MenuList>
                                                </Menu>
                                            </Box>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </Box>
                        </Box> : <></>
                    )
                })
            }
        </Box>
    )
}

export default Tshirts