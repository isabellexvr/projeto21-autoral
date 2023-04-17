import { StyledSelect, SelectLabel, SelectContainer } from "../styles";
import { useState, useEffect } from "react";
import axios from "axios";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    zIndex: state.isFocused ? 100 : "auto",
  }),
};

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
    axios
      .get("https://api.countrystatecity.in/v1/countries", {
        headers: { "X-CSCAPI-KEY": import.meta.env.VITE_LOCATIONS_API_KEY },
      })
      .then((res) => {
        setCountries(res.data.map((c) => ({ value: c.iso2, label: c.name })));
      })
      .catch((err) => {
        console.log(err);
      });
    if (selectedCountry) {
      axios
        .get(
          `https://api.countrystatecity.in/v1/countries/${selectedCountry.value}/states`,
          {
            headers: { "X-CSCAPI-KEY": import.meta.env.VITE_LOCATIONS_API_KEY },
          }
        )
        .then((res) => {
          console.log(res.data)
          setStates(res.data.map((c) => ({ value: c.iso2, label: c.name })));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (selectedState) {
      axios
        .get(
          `https://api.countrystatecity.in/v1/countries/${selectedCountry.value}/states/${selectedState.value}/cities`,
          {
            headers: { "X-CSCAPI-KEY": import.meta.env.VITE_LOCATIONS_API_KEY },
          }
        )
        .then((res) => {
          setCities(res.data.map((c) => ({ value: c.iso2, label: c.name })));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedCountry, selectedState, selectedCity]);

  return (
    <SelectContainer>
      <SelectLabel
        opacity={countries?.length === 0 ? "0" : "1"}
        htmlFor="countries"
      >
        Select country:
      </SelectLabel>
      <StyledSelect
        opacity={countries?.length === 0 ? "0" : "1"}
        id="countries"
        name="countries"
        isDisabled={countries.length < 1}
        options={countries}
        value={selectedCountry}
        isSearchable={countries.length > 0}
        onChange={(e) => handleSelected(e, "country")}
        styles={customStyles}
      />
      <SelectLabel opacity={states?.length === 0 ? "0" : "1"} htmlFor="states">
        Select state:
      </SelectLabel>
      <StyledSelect
        opacity={states?.length === 0 ? "0" : "1"}
        id="states"
        name="states"
        options={states}
        value={selectedState}
        onChange={(e) => handleSelected(e, "state")}
        isDisabled={countries.length < 1 || !selectedCountry}
        styles={customStyles}
      />
      <SelectLabel opacity={cities?.length === 0 ? "0" : "1"} htmlFor="cities">
        Select city:
      </SelectLabel>
      <StyledSelect
        opacity={cities?.length === 0 ? "0" : "1"}
        id="cities"
        name="cities"
        options={cities}
        value={selectedCity}
        onChange={(e) => handleSelected(e, "city")}
        isDisabled={countries.length < 1 || !selectedState}
        styles={customStyles}
      />
    </SelectContainer>
  );
}
