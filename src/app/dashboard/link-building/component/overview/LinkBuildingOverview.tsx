import React from "react";
import Card from "../../../Card";
import ReferingDomainandBacklinkOverTime from "./ReferingDomainandBacklinkOverTime";
import BacklinkType from "./BacklinkType";
import { DofollowvsNofollow } from "./DofollowvsNofollow";
import NewvslostBacklink from "./NewvslostBacklink";

export default function LinkBuildingOverview() {
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
        <DofollowvsNofollow />
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
