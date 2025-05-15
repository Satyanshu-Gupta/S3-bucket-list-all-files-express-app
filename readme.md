## Getting Started

1. **Rename the Environment File**  
    Rename the `env` file to `.env` and set your credentials for the required variables.

2. **Node Version**  
    Ensure you are using **Node.js version 18 or higher**.

3. **Install Dependencies**  
    ```bash
    npm install
    ```

4. **Start the Application**  
    ```bash
    nodemon server.js
    ```
    /**
     * GET /list-files
     *
     * Fetches and returns a list of files from the S3 bucket.
     * 
     * Description:
     * Use this path to fetch files from the S3 bucket. Optionally, you can specify a folder (e.g., 'public/') 
     * when calling the underlying `listAllFiles` function to list files within a specific directory.
     * 
     * Response:
     * - 200: JSON object containing an array of file names under the key `files`.
     * - 500: JSON object with an error message if the files could not be listed.
     */