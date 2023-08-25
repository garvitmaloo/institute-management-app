import { ReactElement } from "react";

export interface AllResourcesPageLayoutProps {
  headerComponent: ReactElement;
  mainComponent: ReactElement;
}

export interface ResourcesHeaderComponentProps {
  heading: string;
  buttons: string[];
}

export interface ResourcesMainComponentProps {
  component: ReactElement;
}

export interface AllBatchesTableProps {
  id: string;
  batchId: string;
  batchName: string;
  subject: string;
  batchIncharge: { teacherName: string };
  students: { studentName: string }[];
}
