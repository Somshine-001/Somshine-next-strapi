"use client";

import { fetchApi } from "@/app/utils/fetch";

async function register({username, email, password}: {username: string, email: string, password: string}) {
    let body = {
        username,
        email,
        password
    }
    const res = await fetchApi("/api/auth/local/register", {
        method: "POST",
        body: JSON.stringify(body),
    });
}
export default function Register() {
    return (
        <div>
            <h1>Register Page</h1>
        </div>
    );
}