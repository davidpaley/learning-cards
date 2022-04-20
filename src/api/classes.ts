import { Session } from "next-auth";

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
export const getClasses = async (session: Session) => {
  const response = await fetch(`${URL}?email=${session.user.email}`);
  const classes = await response.json();
  return classes;
};
