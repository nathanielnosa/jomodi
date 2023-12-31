import React, { useEffect, useState } from "react";
import {
    Card,
    Text,
    Group,
    Loader,
    Checkbox,
    Radio,
    Divider,
    Modal,
    UnstyledButton,
    Button,
    TextInput,
    SimpleGrid,
    Badge,
    Center,
    Menu,
    rem,
    Select,
} from "@mantine/core";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth-context";
import { API_URL } from "../../constants";
import { IconCheckbox, IconPlane, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import statesList from "../../constants";
import RemoveFromCartModal from "../RemoveFromCartModal";


function AddressInfo() {
    const { user } = useAuth();
    const [addresses, setAddresses] = React.useState([]);
    // const [deliveryAddress, setDeliveryAddress] = React.useState();
    const [fullNames, setFullNames] = React.useState([]);
    const [phoneNumbers, setPhoneNumbers] = React.useState([]);
    const [locality, setLocality] = React.useState([]);
    const [address, setAddress] = React.useState([]);
    const [city, setCity] = React.useState([]);
    const [state, setState] = React.useState([]);
    const [pincode, setPincode] = React.useState([]);
    const [landmark, setLandmark] = React.useState([]);
    const [alternatePhone, setAlternatePhone] = React.useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [addressType, setAddressType] = useState("Home");
    const [selectedAddress, setSelectedAddress] = useState({});
    const [openEdit, setOpenEdit] = useState(false);
    const [hideAdresses, setHideAddresses] = useState(false);
    const [opened, setOpened] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [pinAddress, setPinAddress] = useState({});
    const [pinError, setPinError] = useState(false);
    const [pinErrorMessage, setPinErrorMessage] = useState("");

    const handleOpenEdit = (address) => {
        setSelectedAddress(address);
        console.log(selectedAddress);
        setOpenEdit(true);
    };

    const handleClosedEdit = () => {
        setOpenEdit(false);
        setSelectedAddress(null);
    };

    const handleOpen = (address) => {
        setSelectedAddress(address);
        setShowModal(true);
    };

    const handleClose = () => {
        setSelectedAddress(null);
        setShowModal(false);
    };

    const handleDeleteAddress = (id) => {
        axios
            .delete(`${API_URL}order/address/${id}/`)
            .then((res) => {
                console.log(res.data);
                // Use the spread operator to create a new array without the deleted address
                setAddresses((prevAddresses) =>
                    prevAddresses.filter((item) => item.id !== id)
                );
                handleClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    console.log(selectedAddress);

    useEffect(() => {
        // Check if pincode has a length of 6 before making the API request
        if (pincode.length === 6) {
            axios
                .get(`${API_URL}order/pincode_address/?zipcode=${pincode}`)
                .then((res) => {
                    console.log(res.data);
                    setPinAddress(res.data);
                    setPinError(false);
                    setPinErrorMessage("");
                })
                .catch((err) => {
                    console.log(err);
                    setPinError(true);
                    setPinErrorMessage(err.response.data.message);
                });
        }
    }, [pincode]);



    useEffect(() => {
        axios
            .get(`${API_URL}order/address-fetch/?user_id=${user?.user_id}`)
            .then((res) => {
                console.log(res.data.results);
                setAddresses(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [user?.user_id]);

    const handleAddAddress = (e) => {
        e.preventDefault();
        console.log("clicked");
        axios
            .post(`${API_URL}order/address/`, {
                user: user?.user_id,
                full_name: fullNames,
                phone_number: phoneNumbers,
                locality: pinAddress?.Area,
                address: address,
                city: pinAddress?.district,
                state: pinAddress?.state,
                pincode: pincode,
                landmark: landmark,
                alternate_phone_number: alternatePhone,
                address_type: addressType,

            })
            .then((res) => {
                console.log(res.data);
                setOpenModal(false);
                setAddresses([...addresses, res.data]);
                setPinAddress({});
                setPinError(false);
                setPinErrorMessage("");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleEditAddress = (e) => {
        e.preventDefault();
        console.log("clicked");
        axios
            .put(`${API_URL}order/address/${selectedAddress.id}/`, selectedAddress)
            .then((res) => {
                console.log(res.data);

                // Find the index of the edited address in the addresses array
                const editedAddressIndex = addresses.findIndex((address) => address.id === res.data.id);

                if (editedAddressIndex !== -1) {
                    // Create a new array with the updated address
                    const updatedAddresses = [...addresses];
                    updatedAddresses[editedAddressIndex] = res.data;

                    // Update the state with the new addresses array
                    setAddresses(updatedAddresses);
                }

                setOpenEdit(false); // Assuming setDeliveryAddress exists and updates the delivery address state
            })
            .catch((err) => {
                console.log(err);
            });
    };



    return (
        <>
            <Modal
                opened={openModal}
                onClose={() => setOpenModal(false)}
                size="70%"
                shadow="sm"
                padding="xl"
                hideCloseButton
            >
                <Center>
                    <Text mt="xl" fz={30} weight={700}>
                        Add New Address
                    </Text>
                </Center>
                <SimpleGrid cols={2} spacing="xl"
                    breakpoints={[
                        { maxWidth: '62rem', cols: 3, spacing: 'md' },
                        { maxWidth: '48rem', cols: 2, spacing: 'sm' },
                        { maxWidth: '36rem', cols: 1, spacing: 'sm' },
                    ]}
                >
                    <TextInput size="xl" label="Full Name" placeholder="Full Name" onChange={(e) => setFullNames(e.target.value)} />
                    <TextInput size="xl" label="Phone Number" placeholder="Phone Number" onChange={(e) => setPhoneNumbers(e.target.value)} />
                    <TextInput size="xl" label="Pincode" placeholder="Pincode" onChange={(e) => setPincode(e.target.value)}
                        error={pinError && pinErrorMessage}
                        errorLabel={pinErrorMessage}
                    />
                    <TextInput size="xl" label="State" placeholder="State" value={pinAddress?.state} onChange={(e) => setState(e.target.value)} />
                    <TextInput size="xl" label="Locality" placeholder="Locality" value={pinAddress?.Area} onChange={(e) => setLocality(e.target.value)} />
                    <TextInput size="xl" label="Address" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                    <TextInput size="xl" label="City" placeholder="City" value={pinAddress?.district} onChange={(e) => setCity(e.target.value)} />
                    <TextInput size="xl" label="Landmark" placeholder="Landmark" onChange={(e) => setLandmark(e.target.value)} />
                    <TextInput size="xl" label="Alternate Phone Number" placeholder="Alternate Phone Number" onChange={(e) => setAlternatePhone(e.target.value)} />
                    <Radio.Group
                        value={addressType}
                        onChange={setAddressType}
                        name="Address Type"
                        label="Address Type"
                        size="xl"
                    >
                        <Group mt="xs">
                            <Radio value="Home" label="Home Address" />
                            <Radio value="Work" label="Work Address" />
                        </Group>
                    </Radio.Group>
                    <Group mt="xs">
                        <Button size="xl" onClick={handleAddAddress}
                            style={{
                                gridColumn: "1 / span 2",
                                backgroundColor: "orange",
                            }}
                        >
                            Save Address
                        </Button>
                        <Button size="xl" onClick={() => setOpenModal(false)}
                            style={{
                                gridColumn: "1 / span 2",
                                backgroundColor: "red",
                            }}
                        >
                            Cancel
                        </Button>
                    </Group>
                </SimpleGrid>

            </Modal>

            {/* edit modal */}

            <RemoveFromCartModal
                handleRemove={() => handleDeleteAddress(selectedAddress.id)}
                handleClose={() => handleClose()}
                showModal={showModal}
                selectedProduct={selectedAddress}
                text="Address"
            />

            <Modal
                opened={openEdit}
                onClose={() => handleClosedEdit()}
                size="70%"
                shadow="sm"
                padding="xl"
                hideCloseButton
            >
                <Center>
                    <Text mt="xl" fz={30} weight={700}>
                        Edit Address
                    </Text>
                </Center>
                <SimpleGrid cols={2} spacing="xl"
                    breakpoints={[
                        { maxWidth: '62rem', cols: 3, spacing: 'md' },
                        { maxWidth: '48rem', cols: 2, spacing: 'sm' },
                        { maxWidth: '36rem', cols: 1, spacing: 'sm' },
                    ]}
                >
                    <TextInput size="xl" label="Full Name" placeholder="Full Name"
                        value={selectedAddress?.full_name}
                        onChange={(e) => {
                            setSelectedAddress((prevAddress) => ({
                                ...prevAddress,
                                full_name: e.target.value,
                            }));
                        }} />
                    <TextInput size="xl" label="Phone Number"
                        value={selectedAddress?.phone_number}
                        placeholder="Phone Number"
                        onChange={
                            (e) => {
                                setSelectedAddress((prevAddress) => ({
                                    ...prevAddress,
                                    phone_number: e.target.value,
                                }));
                            }
                        }
                    />
                    <TextInput size="xl" label="Locality"
                        value={selectedAddress?.locality}
                        placeholder="Locality"
                        onChange={
                            (e) => {
                                setSelectedAddress((prevAddress) => ({
                                    ...prevAddress,
                                    locality: e.target.value,
                                }));
                            }
                        }
                    />
                    <TextInput size="xl" label="Address" placeholder="Address"
                        value={selectedAddress?.address}
                        onChange={
                            (e) => {
                                setSelectedAddress((prevAddress) => ({
                                    ...prevAddress,
                                    address: e.target.value,
                                }));
                            }
                        } />
                    <TextInput size="xl" label="City" placeholder="City"
                        value={selectedAddress?.city}
                        onChange={
                            (e) => {
                                setSelectedAddress((prevAddress) => ({
                                    ...prevAddress,
                                    city: e.target.value,
                                }));
                            }
                        } />
                    <Select
                        size="xl"
                        label="State"
                        placeholder="State"
                        value={selectedAddress?.state}
                        data={statesList}
                        onChange={(e) => {
                            setSelectedAddress((prevAddress) => ({
                                ...prevAddress,
                                state: e,
                            }));
                        }}
                    />

                    <TextInput size="xl" label="Pincode" placeholder="Pincode"
                        value={selectedAddress?.pincode}
                        onChange={
                            (e) => {
                                setSelectedAddress((prevAddress) => ({
                                    ...prevAddress,
                                    pincode: e.target.value,
                                }));
                            }
                        } />
                    <TextInput size="xl" label="Landmark" placeholder="Landmark"
                        value={selectedAddress?.landmark}
                        onChange={
                            (e) => {
                                setSelectedAddress((prevAddress) => ({
                                    ...prevAddress,
                                    landmark: e.target.value,
                                }));
                            }
                        } />
                    <TextInput size="xl" label="Alternate Phone Number" placeholder="Alternate Phone Number"
                        value={selectedAddress?.alternate_phone_number}
                        onChange={
                            (e) => {
                                setSelectedAddress((prevAddress) => ({
                                    ...prevAddress,
                                    alternate_phone_number: e.target.value,
                                }));
                            }
                        } />
                    <Radio.Group
                        value={selectedAddress?.address_type}
                        onChange={(e) => {
                            setSelectedAddress((prevAddress) => ({
                                ...prevAddress,
                                address_type: e,
                            }));
                        }
                        }
                        name="Address Type"
                        label="Address Type"
                        size="xl"
                    >
                        <Group mt="xs">
                            <Radio value="Home" label="Home Address" />
                            <Radio value="Work" label="Work Address" />
                        </Group>
                    </Radio.Group>
                    <Group mt="xs">
                        <Button size="xl" onClick={(e) => handleEditAddress(e)}
                            style={{
                                gridColumn: "1 / span 2",
                                backgroundColor: "orange",
                            }}
                        >
                            Edit Address
                        </Button>
                        <Button size="xl" onClick={handleClosedEdit}
                            style={{
                                gridColumn: "1 / span 2",
                                backgroundColor: "red",
                            }}
                        >
                            Cancel
                        </Button>
                    </Group>
                </SimpleGrid>

            </Modal>

            <Card shadow="sm">
                <Group mt="xs">
                    <Text fz={30} weight={700} mx="xl">
                        Delivery Address
                    </Text>
                    {
                        hideAdresses && (
                            <IconCheckbox size={30} />
                        )
                    }
                </Group>
                {
                    (hideAdresses && user) && (
                        <Card.Section mx="xl" my="sm">
                            {
                                (addresses.length) ? (
                                    <div>
                                        <Group mt="xs">
                                            <Text>
                                                {selectedAddress?.full_name || addresses[0]?.full_name}
                                            </Text>
                                            <Badge color="blue" variant="light" size="lg">
                                                {selectedAddress?.address_type || addresses[0]?.address_type}
                                            </Badge>
                                            <Text>
                                                {selectedAddress?.phone_number || addresses[0]?.phone_number}
                                            </Text>
                                            <Button onClick={() => {
                                                setHideAddresses(false);
                                            }}
                                                size="xl"
                                                color="blue"
                                                style={{
                                                    gridColumn: "1 / span 2",
                                                    backgroundColor: "orange",
                                                }}
                                            >
                                                <Text size='xl'>
                                                    Change
                                                </Text>
                                            </Button>
                                        </Group>
                                        <Group mt="xs">
                                            <Text size="xl">
                                                {selectedAddress?.address || addresses[0]?.address},
                                            </Text>
                                            <Text size="xl">
                                                {selectedAddress?.locality || addresses[0]?.locality},
                                            </Text>
                                            <Text size="xl">
                                                {selectedAddress?.city || addresses[0]?.city},
                                            </Text>
                                            <Text size="xl">
                                                {selectedAddress?.state || addresses[0]?.state},
                                            </Text>
                                            <Text size="xl">
                                                {selectedAddress?.pincode || addresses[0]?.pincode},
                                            </Text>
                                            <Text size="xl">
                                                {selectedAddress?.landmark || addresses[0]?.landmark},
                                            </Text>
                                        </Group>
                                        <Divider />
                                    </div>
                                ) : (
                                    <div>
                                        <Text fw={700} size={30}>
                                            No Address Found
                                        </Text>
                                    </div>)
                            }
                        </Card.Section>
                    )
                }
                {
                    (!hideAdresses && user) && (<Card.Section mx="xl" p="xl">


                        {addresses.length ? (
                            addresses.map((address, index) => (
                                <div key={index} style={{
                                    marginTop: "10px",
                                }}>
                                    <Group mt="xs">

                                        <Text>
                                            {address.full_name}
                                        </Text>
                                        <Badge color="blue" variant="light" size="lg">
                                            {address.address_type}
                                        </Badge>
                                        <Text>
                                            {address.phone_number}
                                        </Text>
                                        <UnstyledButton onClick={() => {
                                            setSelectedAddress(address);
                                            setOpenEdit(true);
                                        }}>
                                            <Text color="blue" size='xl'>
                                                Edit
                                            </Text>
                                        </UnstyledButton>
                                        <IconTrash size={rem(30)} color="red" onClick={() => handleOpen(address)} />
                                    </Group>
                                    <Group mt="xs">
                                        <Text size="xl">
                                            {address.address},
                                        </Text>
                                        <Text size="xl">
                                            {address.locality},
                                        </Text>
                                        <Text size="xl">
                                            {address.city},
                                        </Text>
                                        <Text size="xl">
                                            {address.state},
                                        </Text>
                                        <Text size="xl">
                                            {address.pincode},
                                        </Text>
                                        <Text size="xl">
                                            {address.landmark},
                                        </Text>
                                    </Group>
                                    <Divider />
                                </div>
                            ))
                        ) : (
                            <>
                                <SimpleGrid cols={2} spacing="xl"
                                    breakpoints={[
                                        { maxWidth: '62rem', cols: 3, spacing: 'md' },
                                        { maxWidth: '48rem', cols: 2, spacing: 'sm' },
                                        { maxWidth: '36rem', cols: 1, spacing: 'sm' },
                                    ]}
                                >
                                    <TextInput size="xl" label="Full Name" placeholder="Full Name" onChange={(e) => setFullNames(e.target.value)} />
                                    <TextInput size="xl" label="Phone Number" placeholder="Phone Number" onChange={(e) => setPhoneNumbers(e.target.value)} />
                                    <TextInput size="xl" label="Pincode" placeholder="Pincode" onChange={(e) => setPincode(e.target.value)}
                                        error={pinError && pinErrorMessage}
                                        errorLabel={pinErrorMessage}
                                    />
                                    <TextInput size="xl" label="State" placeholder="State" value={pinAddress?.state} onChange={(e) => setState(e.target.value)} />
                                    <TextInput size="xl" label="Locality" placeholder="Locality" value={pinAddress?.Area} onChange={(e) => setLocality(e.target.value)} />
                                    <TextInput size="xl" label="Address" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                                    <TextInput size="xl" label="City" placeholder="City" value={pinAddress?.district} onChange={(e) => setCity(e.target.value)} />
                                    <TextInput size="xl" label="Landmark" placeholder="Landmark" onChange={(e) => setLandmark(e.target.value)} />
                                    <TextInput size="xl" label="Alternate Phone Number" placeholder="Alternate Phone Number" onChange={(e) => setAlternatePhone(e.target.value)} />
                                    <Radio.Group
                                        value={addressType}
                                        onChange={setAddressType}
                                        name="Address Type"
                                        label="Address Type"
                                        size="xl"
                                    >
                                        <Group mt="xs">
                                            <Radio value="Home" label="Home Address" />
                                            <Radio value="Work" label="Work Address" />
                                        </Group>
                                    </Radio.Group>
                                    <Group mt="xs">
                                        <Button size="xl" onClick={handleAddAddress}
                                            style={{
                                                gridColumn: "1 / span 2",
                                                backgroundColor: "orange",
                                            }}
                                        >
                                            Save Address
                                        </Button>
                                        {/* <Button size="xl" onClick={() => setOpenModal(false)}
                          style={{
                            gridColumn: "1 / span 2",
                            backgroundColor: "red",
                          }}
                        >
                          Cancel
                        </Button> */}
                                    </Group>
                                </SimpleGrid>
                            </>
                        )
                        }
                    </Card.Section>
                    )
                }
            </Card>
            {
                (user && addresses.length > 0) && (
                    <Card shadow="sm" padding="xl">
                        <Card.Section m="xl" p="xl">
                            <UnstyledButton onClick={() => setOpenModal(true)}>
                                <Group mt="xs">
                                    <IconPlus size={20} color="blue" />
                                    <Text color="blue" size='xl'>
                                        Add New Address
                                    </Text>
                                </Group>
                            </UnstyledButton>
                        </Card.Section>
                    </Card>
                )
            }

        </>

    );
}

export default AddressInfo;
