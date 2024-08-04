import apiClient from "@/apiClient";
import { Select } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";

export default function ProgramSearch({ onProgramSelect, selected }) {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [search] = useDebouncedValue(searchInput, 200);
  console.log(search);
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await apiClient.post(`/programs/search`, {
          searchTerm: search,
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, [search]);

  return (
    <Select
      label="Search program by name"
      placeholder="eg. Stanford"
      value={selected}
      data={data.map((program) => ({
        value: program.id.toString(),
        label: `${program.name} at ${program.institution.name}`,
      }))}
      searchable
      clearable
      searchValue={searchInput}
      onSearchChange={setSearchInput}
      onChange={(value) => onProgramSelect(Number(value))} // Pass the selected program ID
    />
  );
}
