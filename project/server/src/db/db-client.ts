import { DataSource } from 'typeorm'
import User from '../entities/User'
import { CutVote } from '../entities/Cutvote'
import { CutReview } from '../entities/CutReview'
import Notification from '../entities/Notification';

export const createDB = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_DATABASE || 'ghibli_graphql',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'qwer1234',
  logging: !(process.env.NODE_ENV === 'production'),
  synchronize: true, // entities에 명시된 데이터 모델들을 DB에 자동으로 동기화합니다.
  entities: [User, CutVote, CutReview, Notification],
  //데이터 분실, 수정 위험을 방지하기 위해 migration 기능 이용해야 함.

  // entities 폴더의 모든 데이터 모델이 위치해야 합니다.
  // entities: [User, CutVote, CutReview, Notification],

  // host, password는 사실 비공개로 해야 함.
})
