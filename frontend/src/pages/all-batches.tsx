import { useQuery, gql } from "@apollo/client";

import ResourcesHeaderComponent from "../components/resources-header-component";
import ResourcesMainComponent from "../components/resources-main-component";
import AllResourcesPageLayout from "../layout/all-resources-page-layout";
import AllBatchesTable from "../components/all-batches-table";

const GET_ALL_BATCHES = gql`
  query {
    batches {
      errors {
        message
        statusCode
      }
      batchesData {
        batchId
        batchName
      }
    }
  }
`;

export default function AllBatches() {
  const { loading, error, data } = useQuery(GET_ALL_BATCHES);

  if (loading) {
    return (
      <h1 className="p-10 text-center text-2xl font-semibold">Loading ... </h1>
    );
  }

  if (error) {
    return (
      <h1 className="p-10 text-center text-2xl font-semibold">Error 💥 </h1>
    );
  }

  if (data) {
    const tableData = data.batches.batchesData;

    return (
      <AllResourcesPageLayout
        headerComponent={
          <ResourcesHeaderComponent
            heading="All Batches"
            buttons={["Add New"]}
          />
        }
        mainComponent={
          <ResourcesMainComponent
            component={<AllBatchesTable tableData={tableData} />}
          />
        }
      />
    );
  }
}
