import * as yup from "yup";

export const int = yup.number().required("This field is required");
export const required = yup.string().required("This field is required");
