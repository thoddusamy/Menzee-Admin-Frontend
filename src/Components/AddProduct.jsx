import {
    Box, FormControl, Text, FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Select,
    Stack,
    Checkbox,
    useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Api } from '../Config/Api'

const AddProduct = () => {

    const toast = useToast()
    const navigate = useNavigate()
    const [prodCatgory, setProdCatgory] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [prodImg1, setProdImg1] = useState('')
    const [prodImg2, setProdImg2] = useState('')

    const handleUploadImg1 = (pic) => {
        setIsLoading(true)
        if (pic === undefined) {
            toast({
                title: "Please select a pic",
                status: 'error',
                position: "top-right",
                duration: 3500,
                isClosable: true,
            })
            return;
        }
        if (pic.type === "image/jpeg" || pic.type === "image/png") {
            const data = new FormData()
            data.append("file", pic)
            data.append("upload_preset", "menzee")
            data.append("cloud_name", "thoddusamy")
            fetch("https://api.cloudinary.com/v1_1/thoddusamy/image/upload", {
                method: "post",
                body: data
            }).then((res) => res.json()).then((data) => {
                setProdImg1(data.url.toString())
                setIsLoading(false)
            }).catch((error) => {
                console.log(error);
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
            toast({
                title: 'Invalid file format',
                status: 'error',
                position: "top-right",
                duration: 3500,
                isClosable: true,
            })
            return
        }
    }

    const handleUploadImg2 = (pic) => {
        setIsLoading(true)
        if (pic === undefined) {
            toast({
                title: "Please select a pic",
                status: 'error',
                position: "top-right",
                duration: 3500,
                isClosable: true,
            })
            return;
        }
        if (pic.type === "image/jpeg" || pic.type === "image/png") {
            const data = new FormData()
            data.append("file", pic)
            data.append("upload_preset", "menzee")
            data.append("cloud_name", "thoddusamy")
            fetch("https://api.cloudinary.com/v1_1/thoddusamy/image/upload", {
                method: "post",
                body: data
            }).then((res) => res.json()).then((data) => {
                setProdImg2(data.url.toString())
                setIsLoading(false)
            }).catch((error) => {
                console.log(error);
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
            toast({
                title: 'Invalid file format',
                status: 'error',
                position: "top-right",
                duration: 3500,
                isClosable: true,
            })
            return
        }
    }

    const formik = useFormik({
        initialValues: {
            prod_img_url1: '',
            prod_img_url2: '',
            prod_name: '',
            prod_style_no: '',
            prod_sizes: [],
            prod_price: '',
            prod_category: ''
        },

        validate: (values) => {
            const errors = {}

            return errors
        },

        onSubmit: async (values) => {
            try {
                values.prod_img_url1 = prodImg1
                values.prod_img_url2 = prodImg2
                let product_sizes = []
                let sizes = document.getElementsByName('prod_sizes')
                sizes.forEach((size) => {
                    if (size.checked) {
                        product_sizes.push(+size.value)
                    }
                })
                values.prod_sizes = product_sizes
                values.prod_category = prodCatgory
                let { data } = await axios.post(`${Api.url}/products/addproduct`, values, {
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
                navigate('/dashboard/tshirts/:tshirts')
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
    })

    return (
        <Box display='flex'
            alignItems='flex-start'
            justifyContent='center'
            h="85vh"
        >
            <form onSubmit={formik.handleSubmit}>
                <FormControl bg='white' px={10} pb={10} pt={2} h="auto"
                    boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
                >
                    <Box>
                        <Text textAlign='center' my={5} fontSize='3xl'>Add New Product</Text>
                    </Box>
                    {/* ---------- Box 1 ---------- */}
                    <Box display='flex'
                        flexDir={{ base: "column", md: "row" }}
                        alignItems='center'
                        gap={2}
                        width="100%"
                    >
                        <Box width="100%">
                            <FormLabel>Select image 1</FormLabel>
                            <Input name='prod_img_url' type='file' onChange={(e) => handleUploadImg1(e.target.files[0])} />
                        </Box>
                        <Box width="100%">
                            <FormLabel>Select image 2</FormLabel>
                            <Input name='prod_img_url' type='file' onChange={(e) => handleUploadImg2(e.target.files[0])} />
                        </Box>
                    </Box>
                    {/* ---------- Box 2 ---------- */}
                    <Box
                        display='flex'
                        flexDir={{ base: "column", md: "row" }}
                        alignItems='center'
                        gap={2}
                        width="100%"
                    >
                        <Box width="100%">
                            <FormLabel>Product name</FormLabel>
                            <Input name='prod_name' type='text' placeholder='Enter product name'
                                onChange={formik.handleChange} value={formik.values.prod_name} />
                        </Box>
                    </Box>
                    {/* ---------- Box 3 ---------- */}
                    <Box
                        display='flex'
                        flexDir={{ base: "column", md: "row" }}
                        alignItems='center'
                        gap={2}
                        width="100%"
                    >
                        <Box width="100%">
                            <FormLabel>Style No</FormLabel>
                            <Input name='prod_style_no' type='text' placeholder='Enter product style no'
                                onChange={formik.handleChange} value={formik.values.prod_style_no} />
                        </Box>
                        <Box width="100%">
                            <FormLabel>Size Ranges</FormLabel>
                            <Stack spacing={3} direction='row'>
                                <Checkbox colorScheme='green' name='prod_sizes' value={28}>
                                    28
                                </Checkbox>
                                <Checkbox colorScheme='green' name='prod_sizes' value={30}>
                                    30
                                </Checkbox>
                                <Checkbox colorScheme='green' name='prod_sizes' value={32}>
                                    32
                                </Checkbox>
                                <Checkbox colorScheme='green' name='prod_sizes' value={34}>
                                    34
                                </Checkbox>
                                <Checkbox colorScheme='green' name='prod_sizes' value={36}>
                                    36
                                </Checkbox>
                            </Stack>
                        </Box>
                    </Box>
                    {/* ---------- Box 4 ---------- */}
                    <Box
                        display='flex'
                        flexDir={{ base: "column", md: "row" }}
                        alignItems='center'
                        gap={2}
                        width="100%"
                    >
                        <Box width="100%">
                            <FormLabel>Product price</FormLabel>
                            <Input name='prod_price' type='number' placeholder='Enter product price'
                                onChange={formik.handleChange} value={formik.values.prod_price} />
                        </Box>
                        <Box width="100%">
                            <FormLabel>Category</FormLabel>
                            <Select placeholder='select type' onChange={(e) => setProdCatgory(e.target.value)}>
                                <option>tshirts</option>
                                <option>tracks</option>
                                <option>shorts</option>
                            </Select>
                        </Box>
                    </Box>
                    <Button bg='#ff914d'
                        _hover={{ bg: "#ff914d" }}
                        width="100%"
                        mt={5}
                        type='submit'
                        isLoading={isLoading}>Add product</Button>
                    <Text mt={2} textAlign="center">Note: Supported formats - Jpeg, png</Text>
                </FormControl>
            </form>
        </Box>
    )
}

export default AddProduct