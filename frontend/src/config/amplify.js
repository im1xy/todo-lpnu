import { Amplify } from 'aws-amplify';

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: "eu-central-1_gyAqu1Drw",
            userPoolClientId: "410453468vgq17ecuue1tltojv",
            signUpVerificationMethod: 'code',
        }
    }
});