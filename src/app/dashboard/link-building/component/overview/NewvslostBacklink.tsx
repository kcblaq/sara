import { StackedBarChart } from "@/app/dashboard/components/graphs/StackedBarChart";
import { Title } from "@/app/dashboard/technical-seo/components/Overview";


export default function NewvslostBacklink() {
  return (
    <section className="grid gap-4 border shadow-sm rounded-md p-4 py-6">
      <Title title={"New vs lost backlinks "} info="New vs lost backlinks " />
      <StackedBarChart />
    </section>
  )
}
