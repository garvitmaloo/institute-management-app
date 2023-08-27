import Button from "@mui/material/Button";

import { ResourcesHeaderComponentProps } from "../types";
import { useNavigate } from "react-router-dom";

export default function ResourcesHeaderComponent({
  heading,
}: ResourcesHeaderComponentProps) {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/admin/batch/new");
  };

  return (
    <header className="h-[300px] pt-24 bg-slate-900 text-slate-50 text-3xl font-semibold">
      <div className="w-[1250px] mx-auto flex justify-between items-center">
        <div>{heading}</div>
        <div className="flex gap-4">
          <Button variant="contained" onClick={clickHandler}>
            Add New
          </Button>
        </div>
      </div>
    </header>
  );
}
