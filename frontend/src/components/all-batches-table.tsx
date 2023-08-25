import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

import { AllBatchesTableProps } from "../types";

const columns: GridColDef[] = [
  {
    field: "batchId",
    headerName: "Batch ID",
    width: 230,
  },
  {
    field: "batchName",
    headerName: "Batch Name",
    width: 230,
  },
  {
    field: "subject",
    headerName: "Subject",
    width: 230,
  },
  {
    field: "batchIncharge",
    headerName: "Batch Incharge",
    width: 230,
  },
  {
    field: "totalStudents",
    headerName: "Total Students",
    width: 230,
  },
];

export default function AllBatchesTable({
  tableData,
}: {
  tableData: AllBatchesTableProps[];
}) {
  const modifiedTableData: GridRowsProp = tableData.map((item) => ({
    ...item,
    id: item.batchId,
    batchIncharge: item.batchIncharge.teacherName,
    totalStudents: item.students.length,
  }));

  return (
    <div>
      <DataGrid
        rows={modifiedTableData}
        columns={columns}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
