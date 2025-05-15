/* eslint-disable react/prop-types */

import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import Axios from "axios";

import { geoOptions, GEO_API_URL } from "../api";

export default function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue, { page }) => {
    // Get current page number or default to 1 for first load
    const currentPage = page || 1;

    try {
      const response = await Axios.get(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}&offset=${
          (currentPage - 1) * 10
        }&limit=10`,
        geoOptions
      );

      return {
        options: response.data.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
        //enables/disables infinite scrolling

        hasMore: response.data.metadata.totalCount > currentPage * 10,
        // Pass the next page number for when user scrolls to load more
        additional: {
          page: currentPage + 1,
        },
      };
    } catch (error) {
      console.error("Error fetching cities:", error.message);
      return {
        options: [],
        hasMore: false,
      };
    }
  };

  const handleOnchange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnchange}
      loadOptions={loadOptions}
    />
  );
}
