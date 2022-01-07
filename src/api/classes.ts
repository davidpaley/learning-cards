type CreateClass = {
  name: String;
  userEmail: String;
};

const URL = "/api/classes";

export const createClass = (body: CreateClass) =>
  fetch(URL, {
    method: "POST",
    body: JSON.stringify(body),
  });

export const getClasses = () => fetch(URL);
