interface SiteIssues {
  errors: {
    line: number;
    column: number;
    message: string;
    status_code: number;
  }[];
  warnings: {
    line: number;
    column: number;
    message: string;
    status_code: number;
  }[];
}

interface CrawlStatus {
  pages_crawled: number;
  pages_in_queue: number;
  max_crawl_pages: number;
}

interface CrawlingDataOverview {
  id: number;

  tab: "overview";
  data: {
    cost: number;
    site_health: number;
    site_issues: SiteIssues;
    tasks_count: number;
    crawl_status: CrawlStatus;
    crawl_progress: string;
    time_to_interactive: number;
    cumulative_layout_shift: number;
    largest_contentful_paint: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface StatusCode {
  "4xx": number;
  "5xx": number;
  is_broken: number;
  is_redirect: number;
}

interface CrawledDetail {
  pages_crawled: number;
  pages_in_queue: number;
  max_crawl_pages: number;
}

interface CrawlingDataCrawlability {
  id: number;
  crawlingId: number;
  tab: "crawlabilityAndIndexibility";
  data: {
    cost: number;
    items: {
      url: string;
      reason: string;
    }[];
    progress: string;
    indexable: number;
    total_page: number;
    status_code: StatusCode;
    crawled_detail: CrawledDetail;
    non_indexible_count: number;
  };
  createdAt: string;
  updatedAt: string;
}

// Union type for the different crawling data types
export type CrawlingData = CrawlingDataOverview | CrawlingDataCrawlability;

// export interface Project {
//   id: number;
//   userId: number;
//   domain: string;
//   createdAt: string;
//   updatedAt: string;
// }

export interface Crawler {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface InitialState {
  // project: Project;
  crawlings: Array<{
    crawler: Crawler;
    crawlingId: number;
    crawlingData: CrawlingData[];
    createdAt: string;
    updatedAt: string;
    projectId: number;
  }>;
  createdAt: string;
  domain: string;
  id: number;
  updatedAt: string;
  userId: number;
}
