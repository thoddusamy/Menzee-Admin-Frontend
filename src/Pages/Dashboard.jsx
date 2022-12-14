import React, { useEffect, useState, useRef } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import {
    Avatar,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    Tooltip,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { Api } from '../Config/Api'
import BrandLogo from '../assets/brand_logo.png'
import { MdOutlineAddBox } from 'react-icons/md'
import { GrNotes } from 'react-icons/gr'
import { BiMenuAltLeft } from 'react-icons/bi'

const Dashboard = () => {

    const navigate = useNavigate()
    const toast = useToast()
    const { cart, address, summary, payment, orderplaced, updateaddress, tshirts, tracks, shorts } = useParams()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    // const [tshirts, setTshirts] = useState(true)
    // const [tracks, setTracks] = useState(false)
    // const [shorts, setShorts] = useState(false)
    const [userImg, setUserImg] = useState('')
    const [userName, setUserName] = useState('')

    useEffect(() => {
        let checkToken = localStorage.getItem("menzee_authToken")
        if (!checkToken) {
            navigate('/')
        }
    }, [])

    //--------------- fetch admin data --------------------
    const fetchAdminData = async () => {
        try {
            let { data } = await axios.get(`${Api.url}/admin`, {
                headers: {
                    Authorization: `${localStorage.getItem("menzee_authToken")}`,
                },
            })
            setUserImg(data.img)
            setUserName(data.name)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAdminData()
    }, [])

    // const handleTshirtTab = () => {
    //     tshirts === true ? setTshirts(true) : setTshirts(true)
    //     setTracks(false)
    //     setShorts(false)
    // }

    // const handleTracksTab = () => {
    //     tracks === true ? setTracks(true) : setTracks(true)
    //     setTshirts(false)
    //     setShorts(false)
    // }

    // const handleShortsTab = () => {
    //     shorts === true ? setShorts(true) : setShorts(true)
    //     setTshirts(false)
    //     setTracks(false)
    // }

    const handleLogout = () => {
        localStorage.removeItem("menzee_authToken")
        navigate('/')
    }

    return (
        <>
            <Box display={'grid'}
                gridTemplateColumns={{ base: 'auto auto auto', md: "10% 70% 10%" }}
                alignItems='center'
                justifyContent='space-between'
                w='100vw'
                h='70px'
                bg='white'
                boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
                px={{ base: "20px", md: '100px' }}
                position='fixed'
                top={0}
                left={0}
                zIndex={100}
            >
                <Box display={{ base: 'flex', md: 'none' }}>
                    <Button p={0} bg='#ff914d' ref={btnRef} onClick={onOpen} borderRadius="3px">
                        <BiMenuAltLeft fontSize={"25px"} style={{ color: "white" }} />
                    </Button>
                    <Drawer
                        isOpen={isOpen}
                        placement='top'
                        onClose={onClose}
                        finalFocusRef={btnRef}
                    >
                        <DrawerOverlay />
                        <DrawerContent bg="#fdf6f2">
                            <Box display={'flex'}
                                alignItems='center'
                            >
                                <DrawerHeader>MenZee</DrawerHeader>
                                <Text>
                                    <DrawerCloseButton />
                                </Text>
                            </Box>
                            <DrawerBody display={'flex'}
                                alignItems='center'
                                justifyContent='flex-start'
                                flexDir='column'
                                w="100%"
                            >
                                <Button as={Link} to='/dashboard/tshirts/:tshirts'
                                    w="100%" mt={2} bg={tshirts === ":tshirts" ? "#ff914d" : ''}
                                    _active={{ bg: "#ff914d" }}
                                    _focus={{ bg: "#ff914d" }}>
                                    T-shirts
                                </Button>
                                <Button as={Link} to='/dashboard/tracks/:tracks'
                                    w="100%" mt={2} bg={tracks === ":tracks" ? "#ff914d" : ''}
                                    _active={{ bg: "#ff914d" }}
                                    _focus={{ bg: "#ff914d" }}>
                                    Tracks
                                </Button>
                                <Button as={Link} to='/dashboard/shorts/:shorts'
                                    w="100%" mt={2} bg={shorts === ":shorts" ? "#ff914d" : ''}
                                    _active={{ bg: "#ff914d" }}
                                    _focus={{ bg: "#ff914d" }}>
                                    Shorts
                                </Button>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </Box>
                <Box display={'flex'}
                    alignItems='center'
                    justifyContent='center'
                    w={'100%'}
                >
                    <Image cursor='pointer' onClick={() => navigate('/dashboard/tshirts/:tshirts')}
                        width='auto' height='50px' src={BrandLogo} />
                </Box>
                <Box
                    display={{ base: 'none', md: 'flex' }}
                    visibility={cart === ":cart" ||
                        address === ":address" ||
                        summary === ":summary" ||
                        payment === ":payment" ||
                        orderplaced === ":orderplaced" ||
                        updateaddress === ":updateaddress" ? 'hidden' : 'visible'}
                    alignItems='center'
                    justifyContent='center'
                    gap={5}
                    w={'100%'}
                >
                    <Button as={Link} to='/dashboard/tshirts/:tshirts'
                        w={'100%'}
                        h='70px'
                        bg='transparent'
                        borderBottom={tshirts === ":tshirts" ? '5px solid #ff914d' : ''}
                        borderRadius={0}
                        fontSize='20px'
                        fontWeight='bold'
                        color='#ff914d'
                        letterSpacing={5}
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                    >T-shirts</Button>
                    <Button as={Link} to='/dashboard/tracks/:tracks'
                        w={'100%'}
                        h='70px'
                        bg='transparent'
                        borderBottom={tracks === ":tracks" ? '5px solid #ff914d' : ''}
                        borderRadius={0}
                        fontSize='20px'
                        fontWeight='bold'
                        color='#ff914d'
                        letterSpacing={5}
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                    >Tracks</Button>
                    <Button as={Link} to='/dashboard/shorts/:shorts'
                        w={'100%'}
                        h='70px'
                        bg='transparent'
                        borderBottom={shorts === ":shorts" ? '5px solid #ff914d' : ''}
                        borderRadius={0}
                        fontSize='20px'
                        fontWeight='bold'
                        color='#ff914d'
                        letterSpacing={5}
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                    >Shorts</Button>
                </Box>
                <Box display={'flex'}
                    visibility={address === ":address" ||
                        summary === ":summary" ||
                        payment === ":payment" ||
                        orderplaced === ":orderplaced" ||
                        updateaddress === ":updateaddress" ? 'hidden' : 'visible'}
                    alignItems='center'
                    justifyContent='center'
                    w={'100%'}
                    gap='15px'
                >
                    <Tooltip hasArrow label="Add products" bg='#ff914d' mr={3.5} mt={4}>
                        <Box w={'100%'} cursor={'pointer'} position='relative'>
                            <Link to='/dashboard/addproduct'>
                                <MdOutlineAddBox fontSize='25px' style={{ marginTop: "2px" }} />
                                {/* <Badge position={"absolute"} right='5px' top='13px' variant='solid' bg='#ff914d'>1</Badge> */}
                            </Link>
                        </Box>
                    </Tooltip>
                    <Tooltip hasArrow label="Orders" bg='#ff914d' mr={3.5} mt={4}>
                        <Box w={'100%'} cursor={'pointer'} position='relative'
                            display={cart === ":cart" ? 'none' : 'flex'}>
                            <Link to='/dashboard/orders'>
                                <GrNotes fontSize='20px' />
                            </Link>
                        </Box>
                    </Tooltip>
                    <Box w={'100%'} cursor={'pointer'}>
                        <Menu>
                            <MenuButton as={Button} p={0} borderRadius="30px">
                                <Avatar w='35px' h='35px' src={userImg} />
                            </MenuButton>
                            <MenuList mt={3} boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}>
                                <Text my={2} textAlign={'center'}>Hi, {userName}</Text>
                                <MenuItem as={Button} bg="transparent" _hover={{ bg: "#ff914d", color: "white" }}
                                    _active={{ bg: "#ff914d", color: "white" }}
                                    _focus={{ bg: "transparent" }}
                                    borderRadius={0}
                                    onClick={handleLogout}>Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </Box>
            </Box>
            <Box display={'flex'}
                alignItems='center'
                justifyContent='center'
                mt="85px"
                w='auto'
                h='auto'
            >
                <Outlet />
            </Box>
        </>
    )
}

export default Dashboard