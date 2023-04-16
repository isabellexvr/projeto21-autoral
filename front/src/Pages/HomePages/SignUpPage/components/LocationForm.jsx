import { StyledSelect, SelectLabel, SelectContainer } from "../styles";
import { useState, useEffect } from "react";
import axios from "axios";

export default function LocationForm({
  selectedCountry,
  selectedState,
  selectedCity,
  setSelectedCountry,
  setSelectedState,
  setSelectedCity,
}) {
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);


  const handleSelected = (option, state) => {
    switch (state) {
      case "country":
        setSelectedCountry(option);
        break;
      case "state":
        setSelectedState(option);
        break;
      case "city":
        setSelectedCity(option);
        break;
    }
  };

  useEffect(() => {
    /*      axios
      .get("https://api.countrystatecity.in/v1/countries", {
        headers: { "X-CSCAPI-KEY": import.meta.env.VITE_LOCATIONS_API_KEY },
      })
      .then((res) => {
        setCountries(res.data.map((c) => ({ value: c.iso2, label: c.name })));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });  */
    if (selectedCountry) {
      axios
        .get(
          `https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`,
          {
            headers: { "X-CSCAPI-KEY": import.meta.env.VITE_LOCATIONS_API_KEY },
          }
        )
        .then((res) => {
          setStates(res.data.map((c) => ({ value: c.iso2, label: c.name })));
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (selectedState) {
      axios
        .get(
          `https://api.countrystatecity.in/v1/countries/${selectedCountry}/states/${selectedState}/cities`,
          {
            headers: { "X-CSCAPI-KEY": import.meta.env.VITE_LOCATIONS_API_KEY },
          }
        )
        .then((res) => {
          setStates(res.data.map((c) => ({ value: c.iso2, label: c.name })));
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <SelectContainer>
      <SelectLabel htmlFor="countries">Select your country:</SelectLabel>
      <StyledSelect
        id="countries"
        name="countries"
        isDisabled={countries.length < 1}
        options={countries}
        value={selectedCountry}
        isSearchable={countries.length > 0}
        onChange={(e) => handleSelected(e, "country")}
      />
      <SelectLabel htmlFor="states">Select your state:</SelectLabel>
      <StyledSelect
        id="states"
        name="states"
        options={states}
        value={selectedState}
        onChange={(e) => handleSelected(e, "state")}
        isDisabled={countries.length < 1 || !selectedCountry}
      />
      <SelectLabel htmlFor="cities">Select your city:</SelectLabel>
      <StyledSelect
        id="cities"
        name="cities"
        options={cities}
        value={selectedCity}
        onChange={(e) => handleSelected(e, "city")}
        isDisabled={countries.length < 1 || !selectedState}
      />
    </SelectContainer>
  );
}
