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
