import moment from "moment";

export function FormattedDate(date: string){
return moment(date).format("Do MMM, YYYY")
}