const core = require('@actions/core');
const https = require('https');

async function run() {
  try {
    // Get inputs
    const host = core.getInput('host', { required: true });
    const token = core.getInput('token', { required: true });
    const image = core.getInput('image', { required: true });

    // Create request body
    const requestBody = JSON.stringify({
      image: image,
    });

    // Create request options
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    // Send request
    const response = await new Promise((resolve, reject) => {
      const request = https.request(`https://${host}/v1/redeploy`, requestOptions, (response) => {
        let responseBody = '';
        response.on('data', (chunk) => {
          responseBody += chunk;
        });
        response.on('end', () => {
          resolve({
            statusCode: response.statusCode,
            headers: response.headers,
            body: responseBody,
          });
        });
      });
      request.on('error', (error) => {
        reject(error);
      });
      request.write(requestBody);
      request.end();
    });

    // Parse response
    const responseJSON = JSON.parse(response.body);

    // Set output
    core.setOutput('services', responseJSON.join(','));

    // Print output
    console.log(`Deployed ${responseJSON.length} service(s): ${responseJSON.join(',')}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();