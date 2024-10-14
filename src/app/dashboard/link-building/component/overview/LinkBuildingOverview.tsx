import React from "react";
import Card from "../../../Card";
import ReferingDomainandBacklinkOverTime from "./ReferingDomainandBacklinkOverTime";
import BacklinkType from "./BacklinkType";
import { DofollowvsNofollow } from "./DofollowvsNofollow";
import NewvslostBacklink from "./NewvslostBacklink";
import { useLinkBuildingOverview } from "@/app/services/crawlers/link_building";

export default function LinkBuildingOverview() {

  const { isError, isPending, data: OverviewData } = useLinkBuildingOverview("overview");
  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const crawlingData = OverviewData?.project?.crawlings[0]?.crawlingData[0]?.data || {};
  return (
    <main className="py-10 grid gap-8 ">
      <section className="grid gap-6 grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 w-full">
        <Card
          title={""}
          amount={undefined}
          style={""}
          percent={undefined}
          chart={undefined}
        />
        <Card
          title={""}
          amount={undefined}
          style={""}
          percent={undefined}
          chart={undefined}
        />
        <Card
          title={""}
          amount={undefined}
          style={""}
          percent={undefined}
          chart={undefined}
        />
      </section>
      <section className="grid sm:gap-6 sm:space-y-0 space-y-6 grid-cols-1 md:grid-cols-3">
        <DofollowvsNofollow dofollowvsNofollow={crawlingData?.do_follow_vs_no_follow}/>
        <div className="col-span-2 ">
          <ReferingDomainandBacklinkOverTime />
        </div>
      </section>
      <section className="grid  sm:gap-6 sm:space-y-0 space-y-6 grid-cols-1 lg:grid-cols-3 ">
        <BacklinkType />
        <div className="col-span-2">
          <NewvslostBacklink />
        </div>
      </section>
    </main>
  );
}
