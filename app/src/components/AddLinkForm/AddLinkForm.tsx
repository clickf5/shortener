import React, { useRef, useEffect } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { addLink } from '../../slices/linksSlice';

interface linkFormValues {
  url: string;
}

const LinkSchema = Yup.object().shape({
  url: Yup.string().url().required('Please enter a valid URL'),
});

const AddLinkForm = () => {
  const urlField = useRef<null | HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    urlField.current?.focus();
  }, []);

  return (
    <Formik
      initialValues={{ url: '' }}
      validationSchema={LinkSchema}
      onSubmit={(values: linkFormValues, { setSubmitting, resetForm }: FormikHelpers<linkFormValues>) => {
        dispatch(addLink(values.url));
        resetForm();
        urlField.current?.focus();
        setSubmitting(false);
      }}
    >
      {
        ({ errors, touched }) => (
          <Form className="row g-1">
            <div className="col-9">
              <label htmlFor="url" className="visually-hidden">URL</label>
              <Field
                type="text"
                className="form-control"
                id="url"
                name="url"
                placeholder="Input URL"
                innerRef={urlField}
              />
            </div>
            <div className="col-3 d-grid">
              <button type="submit" className="btn btn-primary mb-3">Add</button>
            </div>
            {errors.url && touched.url ? (
              <div className="alert alert-danger" role="alert">
                {errors.url}
              </div>
            ) : null}
          </Form>
        )
      }
    </Formik>
  )
};

export default AddLinkForm;
