import { Connection, createConnection } from 'typeorm'
// import { CutReview } from '../entities/CutReview'
// import { CutVote } from '../entities/CutVote'
// import Notification from '../entities/Notification'
// import User from '../entities/User'

export const createDB = async (): Promise<Connection> =>
  createConnection({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_DATABASE || 'ghibli_graphql',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'qwer1234',
    logging: !(process.env.NODE_ENV === 'production'),
    synchronize: true, // entities에 명시된 데이터 모델들을 DB에 자동으로 동기화합니다.
    entities: [],

    // entities 폴더의 모든 데이터 모델이 위치해야 합니다.
    // entities: [User, CutVote, CutReview, Notification],
  })
