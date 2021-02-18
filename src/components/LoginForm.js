import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/loginSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function LoginForm() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Required!'),
    password: yup.string().required('Password is required'),
  });

  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className='login-form'>
      <form
        className='row g-3 needs-validation'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 className='text-center'>Login</h2>
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
        {login.loginError ? (
          <div className='alert alert-danger text-center' role='alert'>
            <strong>{login.loginError}</strong>
          </div>
        ) : null}
        {/* Link to register */}
        <Link to='/register'>
          <p className='text-center'>Click here to register</p>
        </Link>
      </form>
    </div>
  );
}

export default LoginForm;
