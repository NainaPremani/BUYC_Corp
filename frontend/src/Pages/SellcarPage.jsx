import React, { useEffect, useState } from "react";
import "../Css/Sellcar.css";
import { FormLabel, Input, Select, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initData = {
  image: "",
  company: "",
  model: "",
  year: "",
  paint: "",
  Num_of_accident: "",
  Num_of_prev_buyers: "",
  Registration_place: "",
  KM_driven: "",
  Major_scratches: "",
  price: "",
};

const SellcarPage = () => {
  const [inputData, setInputData] = useState(initData);
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    image,
    company,
    model,
    year,
    paint,
    Num_of_accident,
    Num_of_prev_buyers,
    Registration_place,
    KM_driven,
    Major_scratches,
    price,
  } = inputData;

  // alert function from toastify  //
  const alertError = (msg) => toast.error(msg);
  const alertSuccess = (msg) => toast.success(msg);

  // posting data to database //
  useEffect(() => {
    if (url) {
      setLoading(true);
      fetch("https://buycar-corp.onrender.com/sellcar/addcar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("Buycartoken"),
        },
        body: JSON.stringify({
          images: url,
          car_Manufacturer: inputData.company,
          model: inputData.model,
          year: inputData.year,
          Original_Paint: inputData.paint,
          Number_of_accidents_reported: inputData.Num_of_accident,
          Number_of_previous_buyers: inputData.Num_of_prev_buyers,
          Registration_Place: inputData.Registration_place,
          KMs_on_Odometer: inputData.KM_driven,
          Major_Scratches: inputData.Major_scratches,
          price: inputData.price,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alertError(data.error);
            setLoading(false);
          } else {
            console.log("Added Car from Car Page-", data);
            alertSuccess("Successfully Posted...!");
            setLoading(false);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
    console.log(inputData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data", inputData);
    postDetails();
  };

  // posting image to cloudinary
  const postDetails = () => {
    console.log("imageUrl", imageUrl);
    const data = new FormData();
    data.append("file", imageUrl);
    data.append("upload_preset", "vn0c6zhs");
    data.append("cloud_name", "dnkocy8w8");
    fetch("https://api.cloudinary.com/v1_1/dnkocy8w8/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };
  const loadFile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
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
  return (
    <div className="sellcardiv">
      <div className="carformContainer">
        <div className="carform">
          <form action="" onSubmit={handleSubmit}>
            <div className="img_look">
              <img
                id="output"
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
              />
            </div>
            <div className="carform1">
              <FormLabel>Image of Car</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  loadFile(event);
                  setImageUrl(event.target.files[0]);
                }}
              />
              <FormLabel>Company</FormLabel>

              <Select
                placeholder="Select Company"
                style={{ backgroundColor: "tomato" }}
                value={company}
                name="company"
                onChange={handleChange}
              >
                <option value="Maruti">Maruti</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Tata">Tata</option>
                <option value="Mahindra">Mahindra</option>
              </Select>

              <FormLabel>Model</FormLabel>
              <Input
                type="text"
                placeholder="ex- Wagno R, vitara Breza, i-10,safari,thar"
                value={model}
                name="model"
                onChange={handleChange}
              />

              <FormLabel>Year</FormLabel>
              <Input
                type="number"
                placeholder="ex- 2010,2021"
                value={year}
                name="year"
                onChange={handleChange}
              />

              <FormLabel>Paint</FormLabel>
              <Select
                placeholder="Select color"
                style={{ backgroundColor: "tomato" }}
                value={paint}
                name="paint"
                onChange={handleChange}
              >
                <option value="Red">Red</option>
                <option value="white">White</option>
                <option value="Black">Black</option>
                <option value="Blue">Blue</option>
              </Select>

              <FormLabel>No. of Accidents</FormLabel>
              <Input
                type="number"
                placeholder="ex- 1,2,3"
                value={Num_of_accident}
                name="Num_of_accident"
                onChange={handleChange}
              />
            </div>
            <div className="carform2">
              <FormLabel>Number_of_previous_buyers</FormLabel>
              <Input
                type="number"
                placeholder="ex- 1,2,3...."
                value={Num_of_prev_buyers}
                name="Num_of_prev_buyers"
                onChange={handleChange}
              />
              <FormLabel>Registration_Place</FormLabel>
              <Input
                type="text"
                placeholder="ex- city name...."
                value={Registration_place}
                name="Registration_place"
                onChange={handleChange}
              />

              <FormLabel>KMs_on_Odometer</FormLabel>
              <Input
                type="number"
                placeholder="ex- 12000,15000...."
                value={KM_driven}
                name="KM_driven"
                onChange={handleChange}
              />

              <FormLabel>Major_Scratches</FormLabel>
              <Input
                type="number"
                placeholder="ex- 1,2,3...."
                value={Major_scratches}
                name="Major_scratches"
                onChange={handleChange}
              />

              <FormLabel>price</FormLabel>
              <Input
                type="number"
                placeholder="ex- 500000,110000"
                value={price}
                name="price"
                onChange={handleChange}
              />

              <Input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellcarPage;
