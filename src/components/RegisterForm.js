import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/loginSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function LoginForm() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  const schema = yup.object().shape({
    firstName: yup.string().required('Required!'),
    lastName: yup.string().required('Required!'),
    email: yup.string().email('Invalid email format').required('Required!'),
    password: yup
      .string()
      .required('Password is required')
      .min(4, 'Password is too short - should be 4 chars minimum'),
    passwordConfirmation: yup
      .string()
      .required('Please confirm your password.')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(registerUser(data));
  };

  return (
    <div className='login-form'>
      <form
        className='row g-3 needs-validation'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 className='text-center'>Register</h2>
        <p className='text-center text-muted'>
          Please fill out this form to create an account.
        </p>
        {/* First Name */}
        <input
          name='firstName'
          type='text'
          className={
            errors.firstName ? 'form-control is-invalid' : 'form-control'
          }
          placeholder='First Name'
          ref={register}
        />
        {errors.firstName && (
          <div className='invalid-feedback'>{errors.firstName.message}</div>
        )}
        {/* Last Name */}
        <input
          name='lastName'
          type='text'
          className={
            errors.lastName ? 'form-control is-invalid' : 'form-control'
          }
          placeholder='Last Name'
          ref={register}
        />
        {errors.lastName && (
          <div className='invalid-feedback'>{errors.lastName.message}</div>
        )}
        {/* Email */}
        <input
          name='email'
          type='email'
          className={errors.email ? 'form-control is-invalid' : 'form-control'}
          placeholder='Email'
          ref={register}
        />
        {errors.email && (
          <div className='invalid-feedback'>{errors.email.message}</div>
        )}
        {/* Password */}
        <input
          name='password'
          type='password'
          className={
            errors.password ? 'form-control is-invalid' : 'form-control'
          }
          placeholder='Password'
          ref={register}
        />
        {errors.password && (
          <div className='invalid-feedback'>{errors.password.message}</div>
        )}
        {/* Confirm Password */}
        <input
          name='passwordConfirmation'
          type='password'
          className={
            errors.passwordConfirmation
              ? 'form-control is-invalid'
              : 'form-control'
          }
          placeholder='Confirm Password'
          ref={register}
        />
        {errors.passwordConfirmation && (
          <div className='invalid-feedback'>
            {errors.passwordConfirmation.message}
          </div>
        )}
        {/* Submit */}
        {login.loading ? (
          <button className='btn btn-primary' type='button' disabled>
            <span
              className='spinner-border spinner-border-sm'
              role='status'
              aria-hidden='true'
            ></span>{' '}
            Login in...
          </button>
        ) : (
          <button
            type='submit'
            disabled={!formState.isValid}
            className='btn btn-primary btn-block'
          >
            Submit
          </button>
        )}
        {/* Login Error */}
        {login.registerError ? (
          <div className='alert alert-danger text-center' role='alert'>
            <strong>{login.registerError}</strong>
          </div>
        ) : null}
        {/* Link to login */}
        <Link to='/login'>
          <p className='text-center'>Aldready have an account? Log in here.</p>
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
