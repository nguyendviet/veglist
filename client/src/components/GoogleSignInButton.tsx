import React from 'react';

export default function GoogleSignInButton() {
    return (
        <React.Fragment>
            <div className="g-signin2" data-onsuccess="onSignIn"></div>
        </React.Fragment>
    )
}