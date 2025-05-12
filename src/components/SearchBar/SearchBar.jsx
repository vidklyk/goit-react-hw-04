import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  return (
    <header>
      <Formik
        initialValues={{ topic: "" }}
        onSubmit={(values, actions) => {
          const query = values.topic.trim();
          if (query === "") {
            toast.error("Please enter a search query");
            return;
          }
          onSearch(query);
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <Field
            type="text"
            name="topic"
            className={css.input}
            placeholder="Search images and photos"
            autoComplete="off"
            autoFocus
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
}
