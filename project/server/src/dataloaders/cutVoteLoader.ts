import DataLoader from 'dataloader'
import { CutVote } from '../entities/Cutvote'
import { In } from 'typeorm'
import { Cut } from '../entities/Cut'

type CutvoteKey = {
  cutId: Cut['id']
}
export const createCutVoteLoader = (): DataLoader<CutvoteKey, CutVote[]> => {
  return new DataLoader<CutvoteKey, CutVote[]>(async (keys) => {
    const cutIds = keys.map((key) => key.cutId)
    const votes = await CutVote.find({ where: { cutId: In(cutIds) } })
    const result = keys.map((key) =>
      votes.filter((votes) => votes.cutId === key.cutId),
    )
    return result
  })
}
