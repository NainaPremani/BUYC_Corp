import React, { useEffect, useState } from "react";
import "../Css/Description.css";
import { Button, Heading, Text } from "@chakra-ui/react";

let oemData = {
  year_of_model: "2019",
  Price: "15 Lakh",
  available_color: ["red", "white", "blue"],
  mileage: "18 kmpl",
  power: "20 HP",
  max_speed: 1000,
  price_of_new_vehicle: 10000000,
};

const Description = () => {
  const id = localStorage.getItem("postId");
  const [specData, setSpecData] = useState({});
  // const [oemData, setOemData] = useState(O);
  // console.log(id);

  useEffect(() => {
    fetch(`https://buycar-corp.onrender.com/sellcar/getdatabyid/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("Buycartoken"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Description-result", result);
        setSpecData(result.data);
        // setOemData(result.Oem_data[0]);
      });
  }, []);
  return (
    <div className="Description_div">
      <div className="tableandphotodiv">
        <div className="table1">
          <div className="table1_div">
            <Heading as="h1">Dealer's Data</Heading>
            <div className="table">
              <div className="flexbox">
                <Heading as="h1">Car Manufacturer</Heading>
                <Text fontSize="lg">{specData.car_Manufacturer}</Text>
              </div>
              <hr />
              <div className="flexbox">
                <Heading as="h1">Name of Model</Heading>
                <Text fontSize="lg">{specData.model}</Text>
              </div>
              <hr />
              <div className="flexbox">
                <Heading as="h1">Year of Model</Heading>
                <Text fontSize="lg">
                  {specData?.year ? specData.year : 2015}
                </Text>
              </div>
              <hr />
              <div className="flexbox">
                <Heading as="h1">Km on Odometer</Heading>
                <Text fontSize="lg">{`${specData.KMs_on_Odometer} KM`}</Text>
              </div>
              <hr />
              <div className="flexbox">
                <Heading as="h1">Registration Place</Heading>
                <Text fontSize="lg">{specData.Registration_Place}</Text>
              </div>
              <hr />
              <div className="flexbox">
                <Heading as="h1">Original Color</Heading>
                <Text fontSize="lg">{specData.Original_Paint}</Text>
              </div>
              <hr />
              <div className="flexbox">
                <Heading as="h1">Number of Accidents</Heading>
                <Text fontSize="lg">
                  {specData.Number_of_accidents_reported}
                </Text>
              </div>
              <hr />
              <div className="flexbox">
                <Heading as="h1">Number of Owners</Heading>
                <Text fontSize="lg">{specData.Number_of_previous_buyers}</Text>
              </div>
              <hr />
              <div className="flexbox">
                <Heading as="h1">Major Scratches</Heading>
                <Text fontSize="lg">{specData.Major_Scratches}</Text>
              </div>
              <hr />
              <div className="flexbox">
                <Heading as="h1">Asking Price</Heading>
                <Text fontSize="lg">{`₹ ${specData.price}`}</Text>
              </div>
              <hr />
              <div className="flexbox">
                <Heading as="h1">Posted By</Heading>
                <Text fontSize="lg">{specData.name}</Text>
              </div>
            </div>
          </div>
        </div>

        <div className="table2">
          <img src={specData.images} alt="" />
        </div>
        <div className="table3">
          <div className="table1_div">
            <Heading as="h1">OEM's Spec</Heading>
            <div className="table">
              <div className="flexbox">
                <Heading as="h1">Car Manufacturer</Heading>
                <Text fontSize="lg">{specData.car_Manufacturer}</Text>
              </div>
              <hr />
              <div className="flexbox">
                <Heading as="h1">Name of Model</Heading>
                <Text fontSize="lg">{specData.model}</Text>
              </div>
              <hr />
              <div className="flexbox">
                <Heading as="h1">Year of Model</Heading>
                <Text fontSize="lg">{oemData.year_of_model}</Text>
              </div>
              <hr />
              <div className="flexbox">
                <Heading as="h1">Available Color's</Heading>
                {oemData.available_color &&
                  oemData.available_color.map((el, i) => {
                    return (
                      <button key={i} className="colorbtn">
                        {el}
                      </button>
                    );
                  })}
              </div>
              <hr />
              <div className="flexbox">
                <Heading as="h1">Power </Heading>
                <Text fontSize="lg">{`${oemData.power} BHP`}</Text>
              </div>
              <hr />
              <div className="flexbox">
                <Heading as="h1">Mileage</Heading>
                <Text fontSize="lg">{`${oemData.mileage} KMPL`}</Text>
              </div>
              <hr />

              <hr />
              <div className="flexbox">
                <Heading as="h1">Maximum Speed</Heading>
                <Text fontSize="lg">{`${oemData.max_speed} KMph`}</Text>
              </div>
              <hr />

              <hr />
              <div className="flexbox">
                <Heading as="h1">Original Price</Heading>
                <Text fontSize="lg">{`₹ ${oemData.price_of_new_vehicle}`}</Text>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
