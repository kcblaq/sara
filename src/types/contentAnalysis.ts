// export type Content = {
// id: number;
// title:string;
// website: string;
// url:string;
// statuscode:number;
// words: number;
// atp:number;
// br:number;
// lastcontentupdate:string;
// analysis:string;
// lenghts:number;
// submission:string;
// recommendation: string;
// createdAt: string;
// updatedAt: string;

// }

// type BRate = {
// bounceRate: number
// }

// export type Summary = {
//     number_of_pages: number;
//     average_time_onsite: number[];
//     bounce_rate: BRate[];
// }

// export type contentAnalysisProps = {
//  content: Content[];
//  summary: Summary
// }

export type CrawlingData = {
  id: number;
  crawlingId: number;
  tab: string;
  data: {
    top_domains: {
      count: number;
      domain: string;
    }[];
    aggregate_rank: number;
    connotation_types: {
      neutral: number;
      negative: number;
      positive: number;
    };
    sentiment_connotations: {
      fun: number;
      love: number;
      anger: number;
      share: number;
      sadness: number;
      happiness: number;
    };
  };
  createdAt: string;
  updatedAt: string;
};

type Crawler = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type Crawling = {
  id: number;
  projectId: number;
  crawlerId: number;
  data: {
    keywords: {
      keyword: string;
    }[];
  };
  createdAt: string;
  updatedAt: string;
  crawler: Crawler;
  crawlingData: CrawlingData[];
};

export type contentAnalysisOverViewType = {
  id: number;
  userId: number;
  domain: string;
  createdAt: string;
  updatedAt: string;
  crawlings: Crawling[];
};
