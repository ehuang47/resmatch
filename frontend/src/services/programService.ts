import apiClient from "@/apiClient";

const route = "/program";

interface Program {
  id: string | number;
  // Add other program-related properties here
}

interface FormData {
  // Define the structure of the form data used for creating/updating the program
  name: string;
  specialty: string;
  // Add additional fields as necessary
}

interface SearchParams {
  searchTerm: string;
  pageNum: number;
}

interface SearchResponse {
  totalCount: number;
  programs: Program[];
}

const createProgram = async (formData: FormData): Promise<Program> => {
  const { data } = await apiClient.post(route, formData);
  return data;
};

const readProgram = async (id: string | number): Promise<Program> => {
  const { data } = await apiClient.get(`${route}/${id}`);
  return data;
};

const updateProgram = async (
  id: string | number,
  formData: FormData
): Promise<Program> => {
  const { data } = await apiClient.put(`${route}/${id}`, formData);
  return data;
};

const deleteProgram = async (id: string | number): Promise<void> => {
  await apiClient.delete(`${route}/${id}`);
};

const searchProgram = async ({
  searchTerm,
  pageNum,
}: SearchParams): Promise<SearchResponse> => {
  const { data } = await apiClient.post(`${route}/search`, {
    searchTerm,
    pageNum,
  });
  return data;
};

export default {
  createProgram,
  readProgram,
  updateProgram,
  deleteProgram,
  searchProgram,
};
