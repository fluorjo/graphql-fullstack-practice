import { Query, Resolver, FieldResolver, Root } from 'type-graphql'
import ghibliData from '../data/ghibli'
import { Film } from '../entities/Film'
import { Director } from '../entities/Director'

@Resolver(Film)
export class FilmResolver {
  @Query(() => [Film])
  films(): Film[] {
    return ghibliData.films
  }

  @FieldResolver(() => Director)
  director(@Root() parentFilm: Film): Director | undefined {
    return ghibliData.directors.find((dr) => dr.id === parentFilm.director_id)
  }
}
