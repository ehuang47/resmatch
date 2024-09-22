import { fieldLabelMap } from "@/schemas/fieldLabelMap";
import programName from "@/utils/programName";
import { schemas } from "@/schemas/schemas";
import { Link } from "react-router-dom";
import UserLink from "@/components/UserLink";
import Comment from "@/components/Comment/Comment";
import AddCommentField from "@/components/AddCommentField";
import { useState } from "react";
import Upvote from "@/components/Upvote";

export function columnGenerator(
  modelName: string,
  user,
  openDeleteModal,
  queryKey
) {
  // Get the schema for the provided modelName
  const formSchema = schemas[modelName];

  const filterOutFields = [
    "programId",
    "programXId",
    "programYId",
    "anonymous",
    "import",
    "comments",
    "save",
    "cityId",
  ];
  // Filter out specific fields
  const filteredFields = Object.keys(formSchema).filter(
    (fieldName) => !filterOutFields.includes(fieldName)
  );
  const columns = [];

  // Start with programName as the first column
  if (modelName === "cityUserInput") {
    columns.push(
      {
        headerName: "City",
        field: "city.name",
        filter: true,
      },
      {
        headerName: "State",
        field: "city.state",
        filter: true,
      }
    );
  } else if (modelName !== "xorY") {
    // Add programName as the first column for other models
    columns.push({
      headerName: "State",
      field: "program.city.state",
      width: "120px",
    });
    columns.push({
      headerName: "Program Name",
      valueGetter: (params) => programName(params.data.program),
      cellRenderer: ({ data }) => {
        return (
          <Link
            to={`/program/${data.program?.id}/details`}
            className={`hover:underline`}
          >
            {programName(data.program)}
          </Link>
        );
      },
      filter: true, // Add a text filter for program name
    });
  } else if (modelName === "xorY") {
    columns.push({
      headerName: "Program X",
      valueGetter: (params) => programName(params.data.programX),
      filter: true, // Add a text filter for program name
      cellRenderer: ({ data }) => {
        return (
          <Link
            to={`/program/${data.programX?.id}/details`}
            className={`hover:underline`}
          >
            {programName(data.programX)}
          </Link>
        );
      },
    });
    columns.push({
      headerName: "Program Y",
      valueGetter: (params) => programName(params.data.programY),
      cellRenderer: ({ data }) => {
        return (
          <Link
            to={`/program/${data.programY?.id}/details`}
            className={`hover:underline`}
          >
            {programName(data.programY)}
          </Link>
        );
      },
      filter: true, // Add a text filter for program name
    });
  }

  // Iterate over the filtered fields in the schema to generate the remaining columns
  filteredFields.forEach((fieldName) => {
    const field = formSchema[fieldName];
    let columnDef: any = {
      headerName: field.label || fieldName, // Use label from schema or fieldName as fallback
      field: fieldName,
      filter: true,
    };

    // Handle different field types
    switch (field.type) {
      case "multipleDates":
        columnDef.valueGetter = (params) => {
          const data = params.data;
          const datesArray = data[fieldName];
          return Array.isArray(datesArray)
            ? datesArray
                .map((date: string) => new Date(date).toLocaleDateString())
                .join(", ")
            : null; // Don't display "-" if not available
        };
        break;

      case "select":
        columnDef.valueFormatter = (params) => {
          const value = params.value;
          return fieldLabelMap[fieldName] && fieldLabelMap[fieldName][value]
            ? fieldLabelMap[fieldName][value]
            : value; // No fallback to "-"
        };
        break;

      case "number":
        columnDef.valueGetter = (params) => {
          const data = params.data;
          const scoreFields = [
            "step2Score",
            "step1Score",
            "comlex2Score",
            "step3Score",
          ];

          if (scoreFields.includes(fieldName)) {
            const score = data[fieldName];
            if (score) {
              const lowerBound = Math.floor(score / 5) * 5;
              const upperBound = lowerBound + 4;
              return `${lowerBound}-${upperBound}`;
            }
          }
          return data[fieldName]; // Return the value directly, no "-"
        };
        break;

      case "date":
        columnDef.filter = "agDateColumnFilter"; // Add date filter for the date field
        columnDef.valueGetter = (params) => {
          const dateValue = params.data[fieldName];
          return dateValue ? new Date(dateValue) : null; // Return the Date object for filtering
        };
        columnDef.valueFormatter = (params) => {
          const dateValue = params.value;
          return dateValue ? new Date(dateValue).toLocaleDateString() : null;
        };
        break;

      case "boolean":
        columnDef.cellDataType = "text";
        columnDef.valueFormatter = (params) => {
          if (params.value === true) {
            return "Yes";
          } else if (params.value === false) {
            return "No";
          } else {
            return "";
          }
        };
        break;

      default:
        columnDef.autoHeight = true;
        columnDef.cellClass = "cell-wrap-text";
        break;
    }

    // Push each field's column definition to the columns array
    columns.push(columnDef);
  });

  columns.push({
    headerName: "User",
    field: "user",
    valueFormatter: ({ data }) => {
      return data.anonymous ? "Anonymous" : data.user?.alias;
    },
    cellRenderer: ({ data }) => {
      return <UserLink data={data} />;
    },
    width: "100px",
  });

  columns.push({
    headerName: "Created at",
    field: "createdAt",
    filter: "agDateColumnFilter",
    valueGetter: (params) => {
      const dateValue = params.data["createdAt"];
      return dateValue ? new Date(dateValue) : null; // Return the Date object for filtering
    },
    valueFormatter: (params) => {
      const dateValue = params.value;
      return dateValue ? new Date(dateValue).toLocaleDateString() : null;
    },
    width: "100px",
  });

  columns.push({
    headerName: "Comments",
    autoHeight: true,
    cellClass: "cell-wrap-text",
    cellRenderer: (params) => {
      const [addComment, setAddComment] = useState(false);
      const data = params.data;
      const keys = [queryKey, [modelName, data.id]];

      return (
        <div className={`flex flex-col gap-2`}>
          {data.comments?.length > 0 && (
            <div className={`flex flex-col gap-4`}>
              {data.comments.map((item: any) => (
                <Comment id={item.id} key={item.id} queryKey={queryKey} />
              ))}
            </div>
          )}
          {user && (
            <div
              className={`text-sm text-gray-500 hover:cursor-pointer underline`}
              onClick={() => setAddComment((prev) => !prev)}
            >
              Add comment
            </div>
          )}
          {user && addComment && (
            <AddCommentField
              queryKey={keys}
              modelName={modelName}
              id={data.id}
            />
          )}
        </div>
      );
    },
  });

  columns.push({
    headerName: "Actions",
    cellRenderer: (params) => {
      const data = params.data;
      const modelId = data.id;
      return (
        <div className="flex gap-4 items-center mt-2">
          <Upvote modelName={modelName} item={data} />
          <Link
            to={`/${modelName}/${modelId}/details`}
            className="text-sm underline text-gray-500 hover:cursor-pointer"
          >
            Details
          </Link>
          {user?.id === data.userId && (
            <>
              <Link
                to={`/${modelName}/${modelId}`}
                className="text-sm underline text-gray-500 hover:cursor-pointer"
              >
                Edit
              </Link>
              <div
                className="text-sm underline text-red-500 hover:cursor-pointer"
                onClick={() => openDeleteModal(data.id)}
              >
                Delete
              </div>
            </>
          )}
        </div>
      );
    },
  });

  return columns;
}
