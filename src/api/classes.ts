type CreateClass = {
  name: String;
  userEmail: String;
};

const URL = `${process.env.NEXT_PUBLIC_HOST}/api/classes`;

export const createClass = (body: CreateClass) => {
  return fetch(URL, {
    method: "POST",
    body: JSON.stringify(body),
  });
};
export const getClasses = async () => {
  const response = await fetch(URL);
  const classes = await response.json();
  return classes;
};
