import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, logoutUser, getMyUserProfile, updateUser } from "../../api/apiRequest";
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
            state.user = action.payload.email;
        },
        storeMyProfile : (state, action) => {
            state.user = action.payload.user;
            console.log('New Profile data:', state.user);
        }
    }
});

export const { loginSuccess, logoutSuccess, registerSuccess, storeMyProfile } = authSlice.actions;
export default authSlice.reducer;

export const getMyProfile = () => async (dispatch, getState) => {
    try {
        const { data } = await getMyUserProfile(getState().auth.token);
        console.log('Profile data:', data);
        if (data) {
            dispatch(storeMyProfile({user: data}));
        }
        console.log('Profile data:', data);
    }catch (error) {
        console.error("Error fetching profile:", error);
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        const response = await registerUser(userData); 
        console.log('Registration response:', response);
        const { success, message } = response.data;
        Swal.fire({
            title : success ?'Registration Successful' : `Registration Failed`,
            text: success ? 'You have registered successfully.' : message,
            icon : success ? 'success' : 'error',
            confirmButtonText : 'OK'
        });
        if (success) {
            dispatch(registerSuccess({ email: userData.email }));
            return true;
        }
        return false;
    } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
    }
};

export const login = (userData) => async (dispatch) => {
    try {
        const { data } = await loginUser(userData); 
        const { success, user, token, message } = data;
    
        // Show SweetAlert
        Swal.fire({
            title: success ? 'Login Successful' : 'Login Failed',
            text: success ? 'You have logged in successfully.' : message,
            icon: success ? 'success' : 'error',
            confirmButtonText: 'OK'
        });
        if (success) {
            dispatch(loginSuccess({ user, token }));
            return true;
        }
        return false;
    }
     catch (error) {
        console.error("Login failed:", error.response?.data?.message);
        alert("Login failed. Please check your credentials.");
    }
};

export const updateUserData = (UserData) => async (dispatch, getState) => {
    try {
        const { data } = await  updateUser(getState().auth.user.id, UserData, getState().auth.token);
        if(data.success == true){
            dispatch(storeMyProfile({user: data.user}));
        }

        Swal.fire({
            title : data.success ? 'Update Successful!' : 'Update Failed!',
            text: data.success ? 'Your profile has been updated successfully.' : data.message,
            icon : data.success ? 'success' : 'error',
            confirmButtonText : 'OK'
        });
    }catch (error) {
        console.error("Error updating user data:", error);
        alert("Failed to update user data. Please try again.");
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
                title : 'Logout Successful!',
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
