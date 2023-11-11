/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Cut = {
  __typename?: 'Cut';
  /** 명장면 고유 아이디 */
  id: Scalars['Int'];
  /** 명장면 사진 주소 */
  src: Scalars['String'];
  /** 영화 아이디 */
  filmId: Scalars['Int'];
  film?: Maybe<Film>;
};

export type Director = {
  __typename?: 'Director';
  /** 감독 고유 아이디 */
  id: Scalars['Int'];
  /** 감독 이름 */
  name: Scalars['String'];
};

/** Field error type */
export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Film = {
  __typename?: 'Film';
  /** 영화 고유 아이디 */
  id: Scalars['Int'];
  /** 영화 제목 */
  title: Scalars['String'];
  /** 영화 부제목 */
  subtitle?: Maybe<Scalars['String']>;
  /** 영화 장르 */
  genre: Scalars['String'];
  /** 영화 러닝 타임, minute */
  runningTime: Scalars['Float'];
  /** 영화 줄거리 및 설명 */
  description: Scalars['String'];
  /** 제작자 고유 아이디 */
  director_id: Scalars['Int'];
  /** 포스터 이미지 URL */
  posterImg: Scalars['String'];
  /** 개봉일 */
  release: Scalars['String'];
  director: Director;
};

/** Login input data */
export type LoginInput = {
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
};

/** Login reponse data */
export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  accessToken?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signUp: User;
  login: LoginResponse;
};


export type MutationSignUpArgs = {
  signUpInput: SignUpInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type PaginatedFilms = {
  __typename?: 'PaginatedFilms';
  films: Array<Film>;
  cursor?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  films: PaginatedFilms;
  film?: Maybe<Film>;
  cuts: Array<Cut>;
  cut?: Maybe<Cut>;
};


export type QueryFilmsArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryFilmArgs = {
  filmId: Scalars['Int'];
};


export type QueryCutsArgs = {
  filmId: Scalars['Int'];
};


export type QueryCutArgs = {
  cutId: Scalars['Int'];
};

export type SignUpInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  /** 유저 이름 */
  username: Scalars['String'];
  /** 유저 email */
  email: Scalars['String'];
  /** 생성 일자 */
  createAt: Scalars['String'];
  /** update 일자 */
  updatedAt: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'email'>
    )> }
  ) }
);

export type SignUpMutationVariables = Exact<{
  signUpInput: SignUpInput;
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'User' }
    & Pick<User, 'email' | 'username' | 'createAt' | 'updatedAt' | 'id'>
  ) }
);

export type CutQueryVariables = Exact<{
  cutId: Scalars['Int'];
}>;


export type CutQuery = (
  { __typename?: 'Query' }
  & { cut?: Maybe<(
    { __typename?: 'Cut' }
    & Pick<Cut, 'id' | 'src'>
    & { film?: Maybe<(
      { __typename?: 'Film' }
      & Pick<Film, 'id' | 'title'>
    )> }
  )> }
);

export type CutsQueryVariables = Exact<{
  filmId: Scalars['Int'];
}>;


export type CutsQuery = (
  { __typename?: 'Query' }
  & { cuts: Array<(
    { __typename?: 'Cut' }
    & Pick<Cut, 'id' | 'src'>
  )> }
);

export type FilmQueryVariables = Exact<{
  filmId: Scalars['Int'];
}>;


export type FilmQuery = (
  { __typename?: 'Query' }
  & { film?: Maybe<(
    { __typename?: 'Film' }
    & Pick<Film, 'id' | 'title' | 'subtitle' | 'description' | 'genre' | 'runningTime' | 'posterImg' | 'release'>
    & { director: (
      { __typename?: 'Director' }
      & Pick<Director, 'id' | 'name'>
    ) }
  )> }
);

export type FilmsQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['Int']>;
}>;


export type FilmsQuery = (
  { __typename?: 'Query' }
  & { films: (
    { __typename?: 'PaginatedFilms' }
    & Pick<PaginatedFilms, 'cursor'>
    & { films: Array<(
      { __typename?: 'Film' }
      & Pick<Film, 'id' | 'title' | 'subtitle' | 'runningTime' | 'release' | 'posterImg'>
      & { director: (
        { __typename?: 'Director' }
        & Pick<Director, 'name'>
      ) }
    )> }
  ) }
);


export const LoginDocument = gql`
    mutation login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
    }
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($signUpInput: SignUpInput!) {
  signUp(signUpInput: $signUpInput) {
    email
    username
    createAt
    updatedAt
    id
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      signUpInput: // value for 'signUpInput'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const CutDocument = gql`
    query cut($cutId: Int!) {
  cut(cutId: $cutId) {
    id
    src
    film {
      id
      title
    }
  }
}
    `;

/**
 * __useCutQuery__
 *
 * To run a query within a React component, call `useCutQuery` and pass it any options that fit your needs.
 * When your component renders, `useCutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCutQuery({
 *   variables: {
 *      cutId: // value for 'cutId'
 *   },
 * });
 */
export function useCutQuery(baseOptions: Apollo.QueryHookOptions<CutQuery, CutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CutQuery, CutQueryVariables>(CutDocument, options);
      }
export function useCutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CutQuery, CutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CutQuery, CutQueryVariables>(CutDocument, options);
        }
export type CutQueryHookResult = ReturnType<typeof useCutQuery>;
export type CutLazyQueryHookResult = ReturnType<typeof useCutLazyQuery>;
export type CutQueryResult = Apollo.QueryResult<CutQuery, CutQueryVariables>;
export const CutsDocument = gql`
    query cuts($filmId: Int!) {
  cuts(filmId: $filmId) {
    id
    src
  }
}
    `;

/**
 * __useCutsQuery__
 *
 * To run a query within a React component, call `useCutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCutsQuery({
 *   variables: {
 *      filmId: // value for 'filmId'
 *   },
 * });
 */
export function useCutsQuery(baseOptions: Apollo.QueryHookOptions<CutsQuery, CutsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CutsQuery, CutsQueryVariables>(CutsDocument, options);
      }
export function useCutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CutsQuery, CutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CutsQuery, CutsQueryVariables>(CutsDocument, options);
        }
export type CutsQueryHookResult = ReturnType<typeof useCutsQuery>;
export type CutsLazyQueryHookResult = ReturnType<typeof useCutsLazyQuery>;
export type CutsQueryResult = Apollo.QueryResult<CutsQuery, CutsQueryVariables>;
export const FilmDocument = gql`
    query film($filmId: Int!) {
  film(filmId: $filmId) {
    id
    title
    subtitle
    description
    genre
    runningTime
    posterImg
    release
    director {
      id
      name
    }
  }
}
    `;

/**
 * __useFilmQuery__
 *
 * To run a query within a React component, call `useFilmQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilmQuery({
 *   variables: {
 *      filmId: // value for 'filmId'
 *   },
 * });
 */
export function useFilmQuery(baseOptions: Apollo.QueryHookOptions<FilmQuery, FilmQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilmQuery, FilmQueryVariables>(FilmDocument, options);
      }
export function useFilmLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilmQuery, FilmQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilmQuery, FilmQueryVariables>(FilmDocument, options);
        }
export type FilmQueryHookResult = ReturnType<typeof useFilmQuery>;
export type FilmLazyQueryHookResult = ReturnType<typeof useFilmLazyQuery>;
export type FilmQueryResult = Apollo.QueryResult<FilmQuery, FilmQueryVariables>;
export const FilmsDocument = gql`
    query Films($limit: Int, $cursor: Int) {
  films(limit: $limit, cursor: $cursor) {
    cursor
    films {
      id
      title
      subtitle
      runningTime
      release
      posterImg
      director {
        name
      }
      release
      posterImg
    }
  }
}
    `;

/**
 * __useFilmsQuery__
 *
 * To run a query within a React component, call `useFilmsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilmsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilmsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useFilmsQuery(baseOptions?: Apollo.QueryHookOptions<FilmsQuery, FilmsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FilmsQuery, FilmsQueryVariables>(FilmsDocument, options);
      }
export function useFilmsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FilmsQuery, FilmsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FilmsQuery, FilmsQueryVariables>(FilmsDocument, options);
        }
export type FilmsQueryHookResult = ReturnType<typeof useFilmsQuery>;
export type FilmsLazyQueryHookResult = ReturnType<typeof useFilmsLazyQuery>;
export type FilmsQueryResult = Apollo.QueryResult<FilmsQuery, FilmsQueryVariables>;