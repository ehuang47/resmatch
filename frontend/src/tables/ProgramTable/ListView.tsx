import programService from "@/services/programService";
import { Accordion, Drawer, Loader } from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import NoRecords from "@/components/NoRecords/NoRecords";
import ProgramHeader from "@/headers/ProgramHeader/ProgramHeader";
import ProgramDetails from "@/details/ProgramDetails/ProgramDetails";
import { PAGE_SIZE } from "@/constants";
import ProgramControls from "@/controls/ProgramControls/ProgramControls";
import ProgramFilters from "@/filters/ProgramFilters/ProgramFilters";
import ProgramBadges from "@/badges/ProgramBadges/ProgramBadges";

interface ProgramTableProps {
  className?: string;
}

export default ({ className }: ProgramTableProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm] = useDebouncedValue(searchInput, 200);
  const [nrmpSearchInput, setNRMPSearchInput] = useState("");
  const [nrmpProgramCode] = useDebouncedValue(nrmpSearchInput, 200);
  const [citySearchInput, setCitySearchInput] = useState("");
  const [cityName] = useDebouncedValue(citySearchInput, 200);
  const [state, setState] = useState(null);

  const [pageNum, setPageNum] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: [
      "programs",
      searchTerm,
      state,
      nrmpProgramCode,
      cityName,
      pageNum,
    ],
    queryFn: () => {
      return programService.searchProgram({
        searchTerm,
        pageNum,
        state,
        nrmpProgramCode,
        cityName,
      });
    },
  });

  const clearFilters = () => {
    setState(null);
    setSearchInput("");
    setNRMPSearchInput("");
    setCitySearchInput("");
    setPageNum(1);
  };

  const [opened, { open, close }] = useDisclosure(false);

  const totalPages = useMemo(() => {
    if (data) {
      const totalCount = data?.totalCount || 0;
      return Math.ceil(totalCount / PAGE_SIZE);
    }
  }, [data?.totalCount]);

  const filtersPresent = useMemo(() => {
    return !!searchTerm || state || !!nrmpProgramCode || !!cityName;
  }, [searchTerm, state, nrmpProgramCode, cityName]);

  return (
    <div className={`${className}`}>
      <Drawer opened={opened} onClose={close} title="Filters" position="bottom">
        <ProgramFilters
          state={state}
          setState={setState}
          citySearchInput={citySearchInput}
          setCitySearchInput={setCitySearchInput}
          searchInput={searchInput}
          nrmpSearchInput={nrmpSearchInput}
          setNRMPSearchInput={setNRMPSearchInput}
          setSearchInput={setSearchInput}
          clearFilters={clearFilters}
          setPageNum={setPageNum}
        />
      </Drawer>

      <ProgramControls
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPages={totalPages}
        openFilters={open}
      />

      {filtersPresent && (
        <ProgramBadges
          searchTerm={searchTerm}
          setSearchInput={setSearchInput}
          state={state}
          setState={setState}
          setPageNum={setPageNum}
          nrmpProgramCode={nrmpProgramCode}
          cityName={cityName}
          setNRMPSearchInput={setNRMPSearchInput}
          setCitySearchInput={setCitySearchInput}
        />
      )}
      <div className={`mt-2`}>
        {isLoading && (
          <div className={`flex flex-col items-center`}>
            <Loader color="blue" className={`mt-12`} />
          </div>
        )}
        {data?.programs?.length > 0 && (
          <Accordion variant="separated" className={`mt-6`}>
            {data.programs.map((item: any) => (
              <Accordion.Item key={item.id} value={item.id.toString()}>
                <ProgramHeader item={item} />
                <ProgramDetails item={item} />
              </Accordion.Item>
            ))}
          </Accordion>
        )}
        {data?.programs && data.programs.length === 0 && <NoRecords />}
      </div>
    </div>
  );
};
