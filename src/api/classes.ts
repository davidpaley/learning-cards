import { CustomClass } from "../types";

type CreateClass = {
  name: String;
  userEmail: String;
};

export type DeleteClass = {
  id: String;
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
export const getClasses = async (): Promise<{ data: CustomClass[] }> => {
  const response = await fetch(URL);
  const classes = await response.json();
  return classes;
};

export const deleteClass = (body: DeleteClass) =>
  fetch(URL, {
    method: "DELETE",
    body: JSON.stringify(body),
  });
