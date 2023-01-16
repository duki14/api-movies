import * as io from "io-ts";
import { Request, get, post, expectJson } from "elm-ts/lib/Http";
import { fromType } from "elm-ts/lib/Decode";
import { none } from "fp-ts/lib/Option";
import { array } from "fp-ts/lib/Array";

const ioUser = io.interface({
  Title: io.string,
  Year: io.number,
  imdbID: io.string
});

// referencing only one key from .JSON Users --> User
export type User = io.TypeOf<typeof ioUser>;

// Runtime type --> all obj. keys from my .JSON file Users : [{ }]
const ioUsers = io.array(ioUser);

// Typescript type from Runtime type
export type Users = io.TypeOf<typeof ioUsers>;

// Api call fn.
export const fetchUser = (criteria: string | null ): Request<Users> => get(`https://jsonmock.hackerrank.com/api/movies/search?Title=${criteria}`, fromType(ioUsers));


// export const fetchUser = (): Request<Users> => get('https://jsonmock.hackerrank.com/api/movies', fromType(ioUsers));
// https://jsonmock.hackerrank.com/api/movies?=water

// data koji je niz od ioUsers

