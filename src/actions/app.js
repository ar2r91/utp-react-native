import http from "../helpers/http";


export function getNotes(user_id) {
   const url = "user/" + user_id + "/notes";
   return dispatch => {
      return http.post(url, null, true).then(data => {
           return data.users.Notes;
        },
      ).catch(err => {
         return Promise.reject(err.data);
      });
   };
}

export function createNote(userId, title, description) {
   const url = "note/register";
   let data = {
      userId, title, description,
   };
   return dispatch => {
      return http.post(url, data, true).then(data => {
           return data;
        },
      ).catch(err => {
         return Promise.reject(err.data);
      });
   };
}
