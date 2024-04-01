interface Current {
    performance: {
        performanceScore: number,
        firstContentfulPaint: number,
        largestContentfulPaint: number,
        cumulativeLayoutShift: number,
        totalBlockingTime: number,
        speedIndex: number,
        timeToInteractive: number
    },
    accessibility: {
        accessibilityScore: number
    },
    traffic: {},
    seo: {
        seo_scores: {
            Score: number
        }
    },
    mobile: {},
    recommendation: {},
    ai_recommendation: {}
}

export interface Scores {
    id: number | undefined;
    organic_traffic: number;
    average_time_on_site: number | undefined;
    organic_keywords: number | undefined;
    overall_seo: number | undefined;
    accessibility_score: number | undefined;
    performance: number | undefined;
    best_practice_score: number | undefined;
    user_id: number | undefined;
    date: string | undefined;
    website: string | undefined;
    createdAt: string | undefined;
    updatedAt: string | undefined;
}

interface PerformanceData {
    performanceScore: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
    totalBlockingTime: number;
    speedIndex: number;
    timeToInteractive: number;
}


interface Backlink {
    id: number;
    url: string;
    backlinks: string[]; 
    counts: number;
    new: number;
    createdAt: string;
    updatedAt: string;
}

interface BacklinksResponse {
    backlinks: Backlink[];
}



interface KeywordPosition {
    position: number;
    totalResults: number;
}

type CurrentKeywords = Record<string, KeywordPosition>;


interface KeywordResponse {
    current: CurrentKeywords;
    previous: string[];
}


interface History { }

export interface PerformanceMetrics {
    url: string;
    current: {
        performance: PerformanceData
    };
    history: {
        scores: Scores[];
        backlinks: Backlink[],
        keyword: KeywordResponse,
        previous: []
    }
}