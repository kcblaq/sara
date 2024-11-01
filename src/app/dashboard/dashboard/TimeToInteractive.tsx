import { calculatePercentageDifference } from "@/lib/DateFormater"
import Card from "../Card"
import { arrowStyle, getClass } from "@/helper"
import { LineChart } from "../technical-seo/components/LineChart"

interface TTIProps {
    amount: number,
    previous: number,
    chartData: any[],
}
export const TimeToInteractive: React.FC<TTIProps> = ({
    amount,
    chartData,
    previous,
}) => {
    return (
        <div>
            <Card title={"Time to interactive"}
                amount={amount}
                style={getClass(amount - previous)}
                percent={calculatePercentageDifference(previous, amount)}
                chart={<LineChart pageData={chartData} />}
                arrowPosition={arrowStyle(amount - previous)}
            />
        </div>
    )
}