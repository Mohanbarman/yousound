import * as yup from "yup";

export const id = yup.number().required("This field is required");
export const required = yup.string().required("This field is required");
