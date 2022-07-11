import { AUTH } from '../constants/actionTypes.js';
import * as api from '../api';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const {data} = await api.singIn(formData);

    dispatch({ type: AUTH, data});

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const {data} = await api.singUp(formData);

    dispatch({ type: AUTH, data});

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
