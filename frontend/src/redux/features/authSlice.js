import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, logoutUser, getMyUserProfile } from "../../api/apiRequest";
import Swal from 'sweetalert2';


const initialState = {
    user : null,
    token : localStorage.getItem('token') ? localStorage.getItem('token') : null,
};
console.log('initial state : ' , initialState)

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        registerSuccess: (state, action) => {
            state.user = action.payload.name;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token); 
        },
        storeMyProfile : (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { loginSuccess, logoutSuccess, registerSuccess, storeMyProfile } = authSlice.actions;
export default authSlice.reducer;

export const getMyProfile = () => async (dispatch, getState) => {
    try {
        const { data } = await getMyUserProfile(getState().auth.token);
        if (data) {
            dispatch(storeMyProfile(data));
        }
        console.log('Profile data:', data);
    }catch (error) {
        console.error("Error fetching profile:", error);
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        const response = await registerUser(userData); 
        dispatch(registerSuccess({ 
            name: response.data.name, 
            token: response.data.token 
        }));
        Swal.fire({
            title : 'Registration Successful',
            text: 'You have registered successfully.',
            icon : 'success',
            confirmButtonText : 'OK'
        });
    } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
    }
};

export const login = (userData) => async (dispatch) => {
    try {
        const { data } = await loginUser(userData); 

        dispatch(loginSuccess({
            user: data.user,
            token: data.token
        })); 
        Swal.fire({
            title : 'Login Successful',
            text: 'You have logged in successfully.',
            icon : 'success',
            confirmButtonText : 'OK'
        });
    } catch (error) {
        console.error("Login failed:", error.response?.data?.message);
        alert("Login failed. Please check your credentials.");
    }
};

export const logout = () => async (dispatch, getState) => {
    try {
        
        const data = await logoutUser(getState().auth.token);
        console.log('Logout response:', data); 
        
        if (data && data.data.message) {
            dispatch(logoutSuccess());
            localStorage.removeItem('token');
            Swal.fire({
                title : 'Login Successful',
                text: 'You have logged out successfully.',
                icon : 'success',
                confirmButtonText : 'OK'
            });
        } else {
            alert("Logout failed. Please try again.");
        }
        
    } catch (error) {
        console.error("Logout failed:", error.response?.data?.message || error);
        alert("Logout failed. Please try again.");
    }
};
