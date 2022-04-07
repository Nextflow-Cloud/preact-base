import { Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Navigate } from "react-router-dom";

interface Props {
    children: any;
}

const Authenticated = (props: Props) => {
    const [checkCompleted, setCheckCompleted] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const checkLogin = async () => {
        const response = await fetch("/api/user/check-login");
        const data = await response.json();
        if (data.loggedIn) {
            setLoggedIn(true);
        }
        setCheckCompleted(true);
    };

    useEffect(() => {
        checkLogin();
    }, []);

    if (!checkCompleted) {
        return <>Loading...</>;
    } else {
        if (!loggedIn) {
            location.href = `https://secure.nextflow.cloud/?continue=${encodeURIComponent(location.href)}`;
            return <></>;
        } else {
            return <>{props.children}</>;
        }
    }
}

export default Authenticated;
