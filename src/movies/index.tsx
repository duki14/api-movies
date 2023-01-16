import { Html, map as HtmlMap } from "elm-ts/lib/React";
import * as Cmd from "elm-ts/lib/Cmd";
import {
  DefaultButton,
  Stack,
  DetailsList,
  IColumn,
  SelectionMode,
  TextField,
  Spinner,
  SpinnerSize
} from "@fluentui/react";
import { Either } from "fp-ts/lib/Either";
import { send, HttpError } from "elm-ts/lib/Http";
import { fetchUser, Users, User } from "./api";


import moment from "moment";

// import * --> all our dialog files for <DefaultButton> Kreiranje / Azuriranje / Brisanje

// Dugme --> onClick za formu (dialog) / kreiranje

// ### Ukoliko je Model komponente razlicit od undefined komponenta je pokrenuta

// for every data we fetch --> need to reference it in the model...

// --- Model  --> use type string even for numbers when using textfield (ex. phone: string)


// true --> kad se vrti

// false --> za fetch()


export type Model = {
  data: Users | null,
  criteria: string | null
};



// --- init

// init --> vraca tuple praznog modela (object) i Cmd.none -->  [Model, Cmd.Cmd<Msg>]
// Cmd.none --> handles effects , use Cmd.none when we dont have an effect / in this case the affect is used for fetching my api Cmd<Msg>

// send(fetchUser(), (response) => ({ type: "FetchUser", data: response })) --> instead of Cmd.none
export const init: [Model, Cmd.Cmd<Msg>] = [
  { data: null, criteria: null },
   Cmd.none
];

// --- Messages

// all my actions through one single Msg component
// define actions here
// vrednosti nove u message-u (akcije) --> kroz njih prosledjujem da se update-uje model
// Changedselected --> action at the top --> selecting ony one row from my  -->  azuriranje?:Azuriranje.Model

export type Msg =
    { type: "StartFetchUser" }
  | { type: "FetchUser"; data: Either<HttpError, Users> }
  | { type: "OnChangeForm"; value: string }
  
  
  
  

 

// --- Update

// Update --> (function) / based on Model & Message / place where my model gets transformed
// case 'StartKreiranje' is the  action that will start the action cycle         pozvati fetchuser()

export const update = (msg: Msg, model: Model): [Model, Cmd.Cmd<Msg>] => {
  switch (msg.type) {
    case "StartFetchUser": {
        return [model, send(fetchUser(model.criteria), (response) => ({ type: "FetchUser", data: response }))]
    }
    case "FetchUser": {
      return msg.data.fold(
        (error) => {
          console.log(error);
          return [model, Cmd.none];
        },
        (data) => [{ ...model, data }, Cmd.none]
      );
    }
    case "OnChangeForm": {
      return [{ ...model, criteria: msg.value }, Cmd.none];
    }

  }
};

// Table component

const columns: IColumn[] = [
  {
    key: "title",
    name: "Title",
    minWidth: 250,
    maxWidth: 200,
    onRender: (item: User) => <Stack>{item.Title}</Stack>,
  },
  {
    key: "year",
    name: "Year",
    minWidth: 250,
    maxWidth: 200,
    onRender: (item: User) => <Stack>{item.Year}</Stack>,
  },
  {
    key: "imdbid",
    name: "ImdbID",
    minWidth: 250,
    maxWidth: 200,
    onRender: (item: User) => <Stack>{item.imdbID}</Stack>,
  }

];

// --- View

// newValue || ''  --> this means that if my returned value is falsy (null is a falsy value) --> it will have the value of an empty string
export const view =
  (model: Model): Html<Msg> =>
  (dispatch) =>
    (
      <Stack grow={1}>
        <Stack
          horizontal={true}
          horizontalAlign="end"
          tokens={{ childrenGap: 10 }}
        >
          <TextField
            type="text"
            onChange={(_, newValue) =>
              dispatch({
                type: "OnChangeForm",
                value: newValue || '',
              })
            }
          />
          <DefaultButton
            iconProps={{ iconName: "Search" }}
            styles={{ root: { width: 30 } }}
            onClick={() => dispatch({ type: "StartFetchUser" })}
          /> 
        </Stack>


        <Stack grow={1}>
          <DetailsList
            items={model.data || []}
            columns={columns}
          />
        </Stack>


      </Stack>
    );

