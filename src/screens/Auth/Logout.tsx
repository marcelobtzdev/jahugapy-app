import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { logoutAction } from "../../store/actions/user";

const Login = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        logout();
    }, []);

    const logout = async () => {
       await dispatch(logoutAction());
    };
};

export default Login;