import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../Css/Yourpost.css";
import { RiHome4Fill } from "react-icons/ri";
import { BiCalendar } from "react-icons/bi";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const initValue = {
  company: "",
  price: "",
  color: "",
};

const updatedData = {}; // for updating the data

const Yourpost = () => {
  const [myPost, setMyPost] = useState([]);
  const [myName, setMyName] = useState("");
  const [selectData, setSelectData] = useState(initValue);
  const [reset, setReset] = useState(0);
  const [updateState, setUpdateState] = useState(updatedData);
  const updatedRef = useRef(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // alert function from toastify  //
  const alertError = (msg) => toast.error(msg);
  const alertSuccess = (msg) => toast.success(msg);

  // getting all the post of login user  //
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://buycar-corp.onrender.com/sellcar/getpost/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Buycartoken"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        setMyPost(result.post);
        setLoading(false);

        setMyName(result.user.name);
      });
    //console.log("result",result)
    setLoading(false);
  }, [reset]);

  // get filtered data by company  //
  const handleCompanyData = (query) => {
    setLoading(true);
    console.log("query", query);
    fetch(
      `https://buycar-corp.onrender.com/sellcar/getfilterbycompany/${
        JSON.parse(localStorage.getItem("user"))._id
      }?company=${query}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Buycartoken"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        setMyPost(result.post);
        setLoading(false);
        alertSuccess(`Data is filtered with ${query} Company `);
      });
  };

  // get filtered data for chosen color of the car //
  const handleColorData = (query) => {
    console.log("query", query);
    setLoading(true);
    fetch(
      `https://buycar-corp.onrender.com/sellcar/getfilterbycolor/${
        JSON.parse(localStorage.getItem("user"))._id
      }?color=${query}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Buycartoken"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        setMyPost(result.post);
        setLoading(false);
        alertSuccess(`Data is filtered with ${query} color `);
      });
  };

  const handlePrice = (query) => {
    console.log("query", query);
    setLoading(true);
    fetch(
      `https://buycar-corp.onrender.com/sellcar/getsortbyprice/${
        JSON.parse(localStorage.getItem("user"))._id
      }?price=${query}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Buycartoken"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        setMyPost(result.post);
        setLoading(false);
        alertSuccess(`Data is sorted with price in ${query} order`);
      });
  };

  const handleUpdate = (id) => {
    onOpen();
    updatedRef.current = id;
  };
  console.log(updatedRef);
  const updateMyData = async () => {
    console.log("updateState", updateState);
    setLoading(true);
    try {
      const res = await axios.patch(
        `https://buycar-corp.onrender.com/sellcar/updatedata/${updatedRef.current}`,
        updateState
      );
      console.log(res.data);
      setReset((prev) => prev + 1);
      onClose();
      alertSuccess("Data Updated Successfully...!");
      setLoading(false);
    } catch (err) {
      console.log(err);
      onClose();
      setLoading(false);
      alertError("Data is Not Updated ");
    }
  };
  const handleUpdatedChange = (e) => {
    const { name, value } = e.target;
    setUpdateState({
      ...updateState,
      [name]: value,
    });
  };

  // alert box function //

  const handleOpenAlert = (id) => {
    setIsAlertOpen(true);
    updatedRef.current = id;
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleOk = async () => {
    setLoading(true);
    // Perform actions when OK button is clicked
    fetch(
      `https://buycar-corp.onrender.com/sellcar/deletepost/${updatedRef.current}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Buycartoken"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        alertSuccess("Post Deleted Successfully...!");
        setReset((prev) => prev + 1);
        setLoading(false);
      })
      .catch((err) => {
        alertError(err.msg);
        console.log(err);
        setLoading(false);
      });
    handleCloseAlert();
  };
  //   console.log("updated",updateState)
  const { company, price, color } = selectData;

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  }
  if (myPost.length === 0) {
    return (
      <Card align="center">
        <CardHeader>
          <Heading size="md"> Posts Dashboard</Heading>
        </CardHeader>
        <CardBody>
          <Text>
            You have no posts to make a new post click on "Create Post" button
          </Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme="blue" onClick={() => navigate("/sellyourcar")}>
            Create Post
          </Button>
        </CardFooter>
      </Card>
    );
  } else {
    return (
      <div className="yourpost_container">
        <div className="yourpost">
          <Heading as="h1">Welcome {myName} </Heading>
          <div className="postandsidebar">
            <div className="sidebar">
              <FormLabel>Filter By Company</FormLabel>
              <Select
                placeholder="Filter By Company"
                value={company}
                onChange={(e) => handleCompanyData(e.target.value)}
              >
                <option value="Maruti">Maruti</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Tata">Tata</option>
                <option value="Mahindra">Mahindra</option>
              </Select>

              <FormLabel> Sort ByPrice</FormLabel>
              <Select
                placeholder="Sort By price"
                value={price}
                onChange={(e) => handlePrice(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Desending</option>
              </Select>

              <FormLabel>Filter By color</FormLabel>
              <Select
                placeholder="Filter by Color"
                value={color}
                onChange={(e) => handleColorData(e.target.value)}
              >
                <option value="Red">Red</option>
                <option value="White">White</option>
                <option value="Black">Black</option>
                <option value="Blue">Blue</option>
              </Select>

              <div className="buttons">
                <Button
                  style={{ width: "100%" }}
                  onClick={() => setReset((prev) => prev + 1)}
                >
                  Reset Filter
                </Button>
              </div>
            </div>
            <div className="posts">
              {myPost &&
                myPost.map((el) => {
                  return (
                    <div className="galary" key={el._id}>
                      <img
                        key={el._id}
                        src={el.images}
                        alt="posts"
                        className="items"
                      />

                      <div className="yearandbrand">
                        <p>
                          <BiCalendar></BiCalendar>
                        </p>

                        <p>{el.year}</p>

                        <p>{el.car_Manufacturer}</p>
                        <p>{el.model}</p>
                      </div>
                      <div className="kmdrove">
                        <p>{`KMs on Odometer : ${el.KMs_on_Odometer}`}</p>
                      </div>
                      <div className="price">
                        <p>{`₹ ${el.price}`}</p>
                        <p>
                          <RiHome4Fill></RiHome4Fill>
                        </p>
                        <p>{el.Registration_Place}</p>
                      </div>

                      <div className="color">
                        <p>{`color:- ${el.Original_Paint}`}</p>
                      </div>
                      <div className="buttons-edit">
                        <Button onClick={() => handleUpdate(el._id)}>
                          Update
                        </Button>
                        <Button onClick={() => handleOpenAlert(el._id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Company</FormLabel>

                <Select
                  placeholder="Select Company"
                  style={{ backgroundColor: "tomato" }}
                  name="car_Manufacturer"
                  onChange={handleUpdatedChange}
                >
                  <option value="Maruti">Maruti</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Tata">Tata</option>
                  <option value="Mahindra">Mahindra</option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Model</FormLabel>
                <Input
                  type="text"
                  placeholder="ex- Wagno R, vitara Breza, i-10,safari,thar"
                  name="model"
                  onChange={handleUpdatedChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Year</FormLabel>
                <Input
                  type="number"
                  placeholder="ex- 2010,2021"
                  name="year"
                  onChange={handleUpdatedChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Paint</FormLabel>
                <Select
                  placeholder="Select color"
                  style={{ backgroundColor: "tomato" }}
                  name="Original_Paint"
                  onChange={handleUpdatedChange}
                >
                  <option value="Red">Red</option>
                  <option value="White">White</option>
                  <option value="Black">Black</option>
                  <option value="Blue">Blue</option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>No. of Accidents</FormLabel>
                <Input
                  type="number"
                  placeholder="ex- 1,2,3"
                  name="Number_of_accidents_reported"
                  onChange={handleUpdatedChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Number_of_previous_buyers</FormLabel>
                <Input
                  type="number"
                  placeholder="ex- 1,2,3...."
                  name="Number_of_previous_buyers"
                  onChange={handleUpdatedChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Registration_Place</FormLabel>
                <Input
                  type="text"
                  placeholder="ex- city name...."
                  name="Registration_Place"
                  onChange={handleUpdatedChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>KMs_on_Odometer</FormLabel>
                <Input
                  type="number"
                  placeholder="ex- 12000,15000...."
                  name="KMs_on_Odometer"
                  onChange={handleUpdatedChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Major_Scratches</FormLabel>
                <Input
                  type="number"
                  placeholder="ex- 1,2,3...."
                  name="Major_Scratches"
                  onChange={handleUpdatedChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>price</FormLabel>
                <Input
                  type="number"
                  placeholder="ex- 500000,110000"
                  name="price"
                  onChange={handleUpdatedChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={updateMyData}>
                Update
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <div className="alertbox">
          {isAlertOpen && (
            <div className="alert-box">
              <div className="alert-content">
                <p>Please confirm to delete this post?</p>
                <button onClick={handleOk} className="firstbtn">
                  Yes
                </button>
                <button onClick={handleCloseAlert} className="secondbtn">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Yourpost;
