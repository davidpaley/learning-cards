type CreateClass = {
  name: String;
  userEmail: String;
};

const URL = "http://localhost:3000/api/classes";

export const createClass = (body: CreateClass) =>
  fetch(URL, {
    method: "POST",
    body: JSON.stringify(body),
  });

export const getClasses = async () => {
  const response = await fetch(URL);
  const classes = await response.json();
  return classes;
};
