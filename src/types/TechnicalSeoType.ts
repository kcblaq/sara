
interface HttpStatusCode {
    info: number;
    success: number;
    redirect: number;
    client_error: number;
    server_error: number;
}

interface Issues {
            url: string;
            title: string;
            description: string;
            count: number;
            fixedStatus: string;
            score: string;
            issue_category: string;
}

export interface TechnicalSeoType {
    data: { site_health: number }[];
    lcp: {
        poor: number;
        needsImprovement: number;
        good: number;
    };
    tbt: {
        poor: number;
        needsImprovement: number;
        good: number;
    };
    cls: {
        poor: number;
        needsImprovement: number;
        good: number;
    };
    crawled: {
        total: string;
        crawled: number;
        uncrawled: number;
    };
    httpStatusCode: HttpStatusCode[];
    siteIssue: {
        error: number;
        warning: number;
        notices: number;
        issues: Issues[];
    };
}
