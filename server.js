const express = require('express');
const AWS = require('aws-sdk');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002;

// S3 setup
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Function to list all files in a bucket (with optional prefix/folder)
async function listAllFiles(prefix = '') {
  let isTruncated = true;
  let continuationToken;
  const allFiles = [];

  while (isTruncated) {
    const params = {
      Bucket: process.env.S3_BUCKET,
      Prefix: prefix, // e.g., 'public/' if you want to target a specific folder
      ContinuationToken: continuationToken,
    };

    const response = await s3.listObjectsV2(params).promise();
    response.Contents.forEach((item) => allFiles.push(item.Key));

    isTruncated = response.IsTruncated;
    continuationToken = response.NextContinuationToken;
  }

  return allFiles;
}

// Route to fetch all S3 file keys
app.get('/list-files', async (req, res) => {
  try {
    const files = await listAllFiles(); // or pass 'public/' for folder
    res.json({ files });
  } catch (err) {
    console.error('Error listing files:', err);
    res.status(500).json({ error: 'Failed to list files' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
