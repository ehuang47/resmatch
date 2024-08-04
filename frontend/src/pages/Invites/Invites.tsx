import {
  Accordion,
  Button,
  Drawer,
  LoadingOverlay,
  Pagination,
  Select,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import ProgramSearch from "@/components/ProgramSearch/ProgramSearch";
import apiClient from "@/apiClient";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import classes from "./Invites.module.css";
import inviteService from "@/services/inviteService";

const fetchInvites = async (searchQuery) => {
  const { data } = await apiClient.post(
    `/interview-invites/search`,
    searchQuery
  );
  return data;
};

const pageSize = 10; // Number of items per page

export default () => {
  const [selectedProgramId, setSelectedProgramId] = useState();
  const [dateRange, setDateRange] = useState([null, null]);
  const [pageNum, setPageNum] = useState(1); // State for the current page number

  const { data, error, isLoading } = useQuery({
    queryKey: ["invites", selectedProgramId, dateRange, pageNum],
    queryFn: () => {
      const [startDate, endDate] = dateRange;
      return inviteService.searchInvite({
        programId: selectedProgramId,
        startDate: startDate ? startDate.toISOString() : undefined,
        endDate: endDate ? endDate.toISOString() : undefined,
        pageNum, // Include the page number in the fetch request
      });
    },
  });

  const clearFilters = () => {
    setDateRange([null, null]);
    setSelectedProgramId(null);
    setPageNum(1); // Reset to the first page
  };

  const items = useMemo(() => {
    if (data) {
      return data.interviewInvites?.map((item: any) => {
        return (
          <Accordion.Item key={item.id} value={item.id.toString()}>
            <Accordion.Control>
              <Text>
                <span
                  className={`font-medium`}
                >{`${item.program.name} at ${item.program.institution.name}`}</span>{" "}
                - {dayjs(item.inviteDateTime).format("MMMM D, YYYY")}
              </Text>
              <Text size="sm" c="dimmed">
                Posted By: {item.user.alias}
              </Text>
            </Accordion.Control>
            <Accordion.Panel>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <strong>Graduate Type:</strong> {item.graduateType || "N/A"}
                </div>
                <div>
                  <strong>IMG:</strong> {item.img || "N/A"}
                </div>
                <div>
                  <strong>Medical Degree:</strong> {item.medicalDegree}
                </div>
                <div>
                  <strong>Step 1 Score:</strong>{" "}
                  {item.step1Score || (item.step1ScorePass ? "Pass" : "N/A")}
                </div>
                <div>
                  <strong>Step 2 Score:</strong> {item.step2Score || "N/A"}
                </div>
                <div>
                  <strong>COMLEX 1 Score Pass:</strong>{" "}
                  {item.comlex1ScorePass ? "Yes" : "No"}
                </div>
                <div>
                  <strong>COMLEX 2 Score:</strong> {item.comlex2Score || "N/A"}
                </div>
                <div>
                  <strong>Geographic Preference:</strong>{" "}
                  {item.geographicPreference ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Signal Sent:</strong> {item.signal ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Visa Required:</strong>{" "}
                  {item.visaRequired ? "Yes" : "No"}
                </div>
                <div>
                  <strong>SubI:</strong> {item.subI ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Home Program:</strong> {item.home ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Away Rotation:</strong> {item.away ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Year of Graduation:</strong>{" "}
                  {item.yearOfGraduation || "N/A"}
                </div>
                <div>
                  <strong>Green Card:</strong> {item.greenCard ? "Yes" : "No"}
                </div>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        );
      });
    }
  }, [data]);

  const navigate = useNavigate();

  const [opened, { open, close }] = useDisclosure(false);

  const totalPages = useMemo(() => {
    if (data) {
      const totalCount = data?.totalCount || 0; // Total number of items
      const totalPages = Math.ceil(totalCount / pageSize); // Calculate total pages
      return totalPages;
    }
  }, [data?.totalCount]);

  //   if (isLoading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={`flex flex-col gap-2`}>
      <header>
        <Title
          order={2}
          mb={{ base: "xs", md: "sm" }}
          className="text-lg sm:text-xl md:text-2xl"
        >
          Interview Invites
        </Title>
        <Text
          c="dimmed"
          mb={{ base: "xs", md: "sm" }}
          className="text-sm sm:text-base md:text-lg"
        >
          Discover interview invites shared by fellow medical residency
          applicants, along with their qualifications and experiences at the
          time of the invite.
        </Text>
      </header>
      <div
        className={`flex items-center gap-2 max-sm:items-start max-sm:flex-col max-sm:gap-4`}
      >
        <div className={`flex gap-2 items-center`}>
          <Button onClick={open} variant="outline">
            Filters
          </Button>
          <Button
            className={`sm:hidden`}
            onClick={() => {
              navigate("/interview-invites/add");
            }}
          >
            Add Invite
          </Button>
          <Pagination
            className={`max-sm:hidden`}
            value={pageNum}
            onChange={setPageNum}
            total={totalPages}
          />
        </div>
        <div className={`flex gap-2`}>
          <Button
            className={`max-sm:hidden`}
            onClick={() => {
              navigate("/interview-invites/add");
            }}
          >
            Add Invite
          </Button>
          <Pagination
            className={`sm:hidden ${classes["mobile-page"]}`}
            value={pageNum}
            onChange={setPageNum}
            total={totalPages}
            boundaries={0}
          />
        </div>
      </div>
      <Drawer opened={opened} onClose={close} title="Filters" position="bottom">
        <div className={`flex flex-col gap-3 items-start`}>
          <Button onClick={clearFilters}>Clear Filters</Button>
          <DatePickerInput
            type="range"
            label="Pick dates range"
            placeholder="Pick dates range"
            value={dateRange}
            onChange={setDateRange}
            clearable
          />
          <ProgramSearch
            onProgramSelect={setSelectedProgramId}
            selected={selectedProgramId}
          />
        </div>
      </Drawer>

      <div className={`relative`} style={{ minHeight: "200px" }}>
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 1 }}
        />
        {data?.interviewInvites?.length === 0 && (
          <Text c="dimmed" size="sm">
            No data found...
          </Text>
        )}
        {data?.interviewInvites?.length > 0 && <Accordion>{items}</Accordion>}
      </div>
    </div>
  );
};
