
import currentProperty from '@/app/utils/currentProperty'
import { RankTrackerCrawler } from './rank_tracking'

export async function rankTracker() {
  const property = currentProperty();


  const response = await Promise.all(
    [
      RankTrackerCrawler(property.domain),

    ]
  )
}
