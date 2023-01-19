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

const ioUsers = io.interface({
  page: io.number,
  per_page: io.number,
  total: io.number,
  total_pages: io.number,
  data: io.array(io.interface({ 
    Title: io.string,
    Year: io.number,
    imdbID: io.string
  }))
});


// referencing only one key from .JSON Users --> User
export type User = io.TypeOf<typeof ioUser>;

// Typescript type from Runtime type
export type Users = io.TypeOf<typeof ioUsers>;

// Api call fn.
export const fetchUser = (yearSearch: number | null ): Request<Users> => get(`https://jsonmock.hackerrank.com/api/movies/search?Year=${yearSearch}`, fromType(ioUsers));



