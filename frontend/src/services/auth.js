import { signUp, signIn, signOut, confirmSignUp } from 'aws-amplify/auth';

export async function handleSignUp(email, password) {
    try {
        await signUp({
            username: email,
            password: password,
            options: {
                userAttributes: {
                    email: email,
                },
            },
        });
        return { success: true };
    } 
    catch (error) {
        return {
            success: false,
            error: error.message,
        }
    }
}

export async function handleConfirmSignUp(email, code) {
    try {
        await confirmSignUp({
            username: email,
            confirmationCode: code
        });
        await signOut();
        return { success: true };
    } 
    catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

export async function handleSignIn(email, password) {
    try {
        await signIn({ 
            username: email, 
            password: password
        });
        return { success: true };
    } 
    catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

export async function handleSignOut() {
    try {
        await signOut();
        return { success: true };
    } 
    catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}