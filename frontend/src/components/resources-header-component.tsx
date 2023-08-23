import Button from "@mui/material/Button";

import { ResourcesHeaderComponentProps } from "../types";

export default function ResourcesHeaderComponent({
  heading,
  buttons,
}: ResourcesHeaderComponentProps) {
  return (
    <header className="h-[300px] pt-24 bg-slate-900 text-slate-50 text-3xl font-semibold">
      <div className="w-[1250px] mx-auto flex justify-between items-center">
        <div>{heading}</div>
        <div className="flex gap-4">
          {buttons.map((button) => (
            <Button variant="contained" key={button}>
              {button}
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}
