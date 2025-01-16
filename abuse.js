// @krisss
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const MICROSOFT_SUBMISSION_URL = 'https://www.microsoft.com/en-us/wdsi/filesubmission';

async function submitFile(filePath, email, count, comments) {
    if (!fs.existsSync(filePath)) {
        console.error('File not found!');
        return;
    }

    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    form.append('email', email);
    form.append('comments', comments);

    for (let i = 0; i < count; i++) {
        try {
            const response = await axios.post(MICROSOFT_SUBMISSION_URL, form, {
                headers: form.getHeaders(),
            });
            console.log(`File submission ${i + 1}/${count} succeeded:`, response.status);
        } catch (error) {
            console.error(`Error submitting file on attempt ${i + 1}/${count}:`, error.response?.status, error.response?.data || error.message);
        }
    }
}

async function submitUrl(url, email, count, comments) {
    for (let i = 0; i < count; i++) {
        try {
            const response = await axios.post(MICROSOFT_SUBMISSION_URL, {
                url,
                email,
                comments,
            });
            console.log(`URL submission ${i + 1}/${count} succeeded:`, response.status);
        } catch (error) {
            console.error(`Error submitting URL on attempt ${i + 1}/${count}:`, error.response?.status, error.response?.data || error.message);
        }
    }
}

const argv = yargs(hideBin(process.argv))
    .option('type', {
        alias: 't',
        type: 'string',
        demandOption: true,
        choices: ['file', 'url'],
    })
    .option('email', {
        alias: 'e',
        type: 'string',
        demandOption: true,
    })
    .option('path', {
        alias: 'p',
        type: 'string',
        demandOption: true,
    })
    .option('count', {
        alias: 'c',
        type: 'number',
        demandOption: true,
    })
    .option('comments', {
        alias: 'm',
        type: 'string',
        demandOption: true,
    })
    .argv;

(async () => {
    const { type, email, path, count, comments } = argv;

    if (type === 'file') {
        await submitFile(path, email, count, comments);
    } else if (type === 'url') {
        await submitUrl(path, email, count, comments);
    } else {
        console.error('Invalid type specified. Use "file" or "url".');
    }
})();
