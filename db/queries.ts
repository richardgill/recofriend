import {
  Recommendation,
  RecommendationRecord,
  RecommendationsRecord,
  UserRecord,
} from "./xata"
import { xata } from "./client"

export type RecommendationWithTo = RecommendationRecord & { to: UserRecord[] }

export const recommendationsWithTo = async (
  recommendations: RecommendationRecord[]
): Promise<RecommendationWithTo[]> => {
  const ids = recommendations.map((r) => r.id)
  const recommended: RecommendationsRecord[] = await xata.db.recommendations
    .filter({ recommendation: { $any: ids } })
    .getAll()

  const userIds = recommended.map((rd) => rd.user?.id)

  const users: UserRecord[] = await xata.db.user
    .filter({ id: { $any: userIds } })
    .getAll()

  const result = recommendations.map((recommendation) => {
    const to = recommended
      .filter((r) => r.recommendation?.id === recommendation.id)
      .map((recommendationsRecord) =>
        users.find((u) => u.id === recommendationsRecord.user?.id)
      )
      .filter((u): u is UserRecord => !!u)
    return { ...recommendation, to }
  })
  return result
}
