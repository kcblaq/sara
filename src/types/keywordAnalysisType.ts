type country_distributionType = {
  country_iso_code: string;
  countrypercentage_code: number;
  search_volume: number;
};

type itemObj = {
  keyword: string;
  search_volume: number;
  country_distribution: country_distributionType[];
};

export interface KeywordAnalysisDataType {
  items: itemObj[];
  items_count: number;
}
