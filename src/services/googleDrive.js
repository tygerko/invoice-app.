const SCOPES = 'https://www.googleapis.com/auth/drive.file';

// We will load the Client ID from environment variables
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

let tokenClient;
let gapiInited = false;
let gisInited = false;

// 1. Load the scripts dynamically
export function loadGoogleScripts(callback) {
    if (gapiInited && gisInited) {
        if (callback) callback();
        return;
    }

    const script1 = document.createElement('script');
    script1.src = 'https://apis.google.com/js/api.js';
    script1.onload = () => {
        window.gapi.load('client', async () => {
            await window.gapi.client.init({
                discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
            });
            gapiInited = true;
            if (gisInited && callback) callback();
        });
    };
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://accounts.google.com/gsi/client';
    script2.onload = () => {
        tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // defined later
        });
        gisInited = true;
        if (gapiInited && callback) callback();
    };
    document.body.appendChild(script2);
}

// 2. Upload Function
export async function uploadToDrive(data, fileName) {
    console.log('--- Google Drive Upload Attempt ---');
    console.log('Client ID:', CLIENT_ID);
    console.log('Origin:', window.location.origin);

    if (!CLIENT_ID) {
        console.error('Missing VITE_GOOGLE_CLIENT_ID in .env file');
        alert('Chýba Google Client ID! Nastav ho v premenných prostredia (VITE_GOOGLE_CLIENT_ID).');
        return;
    }

    // Ensure scripts are loaded
    if (!gapiInited || !gisInited) {
        console.log('Google scripts not loaded yet, loading now...');
        loadGoogleScripts(() => uploadToDrive(data, fileName));
        return;
    }

    tokenClient.callback = async (resp) => {
        if (resp.error) {
            console.error('Google Auth Error:', resp);
            alert(`Chyba pri autorizácii Google Drive: ${resp.error}`);
            throw resp;
        }

        console.log('Auth successful, starting upload...');
        try {
            // Create JSON backup of the invoice data
            const fileContent = JSON.stringify(data, null, 2);
            const file = new Blob([fileContent], { type: 'application/json' });

            const metadata = {
                'name': fileName.replace('.pdf', '.json'),
                'mimeType': 'application/json',
            };

            const accessToken = window.gapi.client.getToken().access_token;
            const form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', file);

            const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                method: 'POST',
                headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
                body: form,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Drive API Error:', errorData);
                throw new Error('Nepodarilo sa nahrať súbor.');
            }

            const result = await response.json();
            console.log('Upload complete!', result);
            alert(`Faktúra (dáta) úspešne zálohovaná na Google Drive!`);

        } catch (err) {
            console.error('Upload Error Details:', err);
            alert('Chyba pri nahrávaní na Google Drive: ' + err.message);
        }
    };

    if (window.gapi.client.getToken() === null) {
        console.log('Requesting initial access token...');
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        console.log('Refreshing or using existing token...');
        tokenClient.requestAccessToken({ prompt: '' });
    }
}
