import { AllResourcesPageLayoutProps } from "../types";

export default function AllResourcesPageLayout({
  headerComponent,
  mainComponent,
}: AllResourcesPageLayoutProps) {
  return (
    <div className="relative">
      {headerComponent}
      {mainComponent}
    </div>
  );
}
