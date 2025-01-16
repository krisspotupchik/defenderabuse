# Windows defender abuse script by @krisss

# install Node.js
sudo apt update && sudo apt install -y curl && curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt install -y nodejs

# Initialize a new Node.js project and install dependencies
mkdir abuse && cd abuse && npm init -y && npm install axios form-data yargs

# Usage for file
node abuse.js --type file --email user@example.com --path ./suspicious_file.exe --count 5 --comments "This file appears malicious."

# Usage for url
node abuse.js --type url --email user@example.com --path https://suspicious-site.com --count 3 --comments "This URL is suspicious."
