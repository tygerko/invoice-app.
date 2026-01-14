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

// Helper to get or create the "Faktúry" folder
async function getOrCreateFolder(accessToken) {
    const folderName = 'Faktúry';

    // 1. Search for existing folder
    const searchUrl = `https://www.googleapis.com/drive/v3/files?q=name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`;
    const searchRes = await fetch(searchUrl, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
    });
    const searchData = await searchRes.json();

    if (searchData.files && searchData.files.length > 0) {
        return searchData.files[0].id;
    }

    // 2. Create if not found
    const createUrl = 'https://www.googleapis.com/drive/v3/files';
    const createRes = await fetch(createUrl, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder'
        })
    });
    const createData = await createRes.json();
    return createData.id;
}

// 2. Upload Function
export async function uploadToDrive(data, fileName) {
    console.log('--- Google Drive Upload Attempt ---');

    if (!CLIENT_ID) {
        console.error('Missing VITE_GOOGLE_CLIENT_ID in .env file');
        alert('Chýba Google Client ID! Nastav ho v premenných prostredia (VITE_GOOGLE_CLIENT_ID).');
        return;
    }

    // Ensure scripts are loaded
    if (!gapiInited || !gisInited) {
        loadGoogleScripts(() => uploadToDrive(data, fileName));
        return;
    }

    tokenClient.callback = async (resp) => {
        if (resp.error) {
            console.error('Google Auth Error:', resp);
            alert(`Chyba pri autorizácii Google Drive: ${resp.error}`);
            throw resp;
        }

        try {
            const accessToken = window.gapi.client.getToken().access_token;

            // Get or create the "Faktúry" folder
            console.log('Ensuring "Faktúry" folder exists...');
            const folderId = await getOrCreateFolder(accessToken);

            console.log('Uploading file to folder:', folderId);

            // Create JSON backup of the invoice data
            const fileContent = JSON.stringify(data, null, 2);
            const file = new Blob([fileContent], { type: 'application/json' });

            const metadata = {
                'name': fileName.replace('.pdf', '.json'),
                'mimeType': 'application/json',
                'parents': [folderId] // Put file in the folder
            };

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
            alert(`Faktúra (dáta) úspešne zálohovaná v priečinku "Faktúry" na Google Drive!`);

        } catch (err) {
            console.error('Upload Error Details:', err);
            alert('Chyba pri nahrávaní na Google Drive: ' + err.message);
        }
    };

    if (window.gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        tokenClient.requestAccessToken({ prompt: '' });
    }
}
