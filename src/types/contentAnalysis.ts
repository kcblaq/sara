
export type Content = {
id: number;
title:string;
website: string;
url:string;
statuscode:number;
words: number;
atp:number;
br:number;
lastcontentupdate:string;
analysis:string;
lenghts:number;
submission:string;
recommendation: string;
createdAt: string;
updatedAt: string;

}

type BRate = {
bounceRate: number
}

export type Summary = {
    number_of_pages: number;
    average_time_onsite: number[];
    bounce_rate: BRate[];
}

export type contentAnalysisProps = {
 content: Content[];
 summary: Summary
}