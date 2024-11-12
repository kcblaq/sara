import { calculatePercentageDifference } from "@/lib/DateFormater"
import Card from "../Card"
import { arrowStyle, getClass } from "@/helper"
import { LineChart } from "../technical-seo/components/LineChart"

interface LCPProps {
    amount: number,
    previous: number,
    chartData: any[],
}
export const LCP: React.FC<LCPProps> = ({
    amount,
    chartData,
    previous,
}) => {
    return (
        <div>
            <Card title={"LCP"}
                amount={amount}
                style={getClass(amount - previous)}
                percent={calculatePercentageDifference(previous, amount)}
                chart={<LineChart pageData={chartData} />}
                arrowPosition={arrowStyle(amount - previous)}
            />
        </div>
    )
}