import TitleAndDescription from "@/app/component/TitleAndDescription";
import BarChartSingle from "@/app/dashboard/technical-seo/components/(technicalseo)/BarChartSingle";
import { Title } from "@/app/dashboard/technical-seo/components/Overview";

export default function ReferingDomainandBacklinkOverTime() {
  return (
    <section className="grid gap-4 border shadow-sm rounded-md p-4 py-6">
      <Title title={"Referring domains and backlinks over time"} info="Referring domains and backlinks over time" />
      <BarChartSingle labels={[]} data={[]} xAxisLabel="Month" yAxisLabel="Amount" />
    </section>
  )
}
