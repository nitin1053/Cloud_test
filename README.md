# Backend API Deployment

This project demonstrates how to deploy a Node.js backend API to a virtual machine (VM) using GitHub Actions.

## Project Structure

- `index.js`: Main entry point for the Node.js application.
- `package.json`: Project metadata and dependencies.
- `package-lock.json`: Locks the versions of the dependencies.
- `README.md`: Project documentation.
- `.github/workflows/deploy.yml`: GitHub Actions workflow file for deployment.

## Prerequisites

1. **Node.js**: Ensure Node.js and npm are installed on your development machine.
2. **VM**: A VM instance where the Node.js application will be deployed.
3. **SSH Key**: An SSH key pair configured for access to your VM.
4. **GitHub Secrets**: Add the following secrets to your GitHub repository:
   - `VM_HOST`: The IP address of your VM 
   - `VM_USERNAME`: The username for SSH access 
   - `VM_SSH_KEY`: The SSH private key content.

## Setup

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/nitin1053/Cloud_test.git
    cd Cloud_test
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Start the Application Locally**:

    ```bash
    sudo node index.js
    ```

    Access the API at `http://localhost:80/sayHello`.

4. **Setup in VM**:
    ```bash
    sudo ssh -i $path of key $USERNAME@$HOST
    git clone https://github.com/nitin1053/Cloud_test.git
    cd Cloud_test
    npm install


## GitHub Actions Workflow

The GitHub Actions workflow (`deploy.yml`) automates the deployment process. It performs the following steps:

1. **Checkout Code**: Checks out the latest code from the `master` branch.
2. **Install SSH Client**: Installs the SSH client on the runner.
3. **Transfer Files**: Securely copies files to the VM using `scp`.
4. **Deploy Application**: SSH into the VM, install dependencies, stop any existing process on port 80, and start the new instance of the application.

### Workflow File: `.github/workflows/deploy.yml`

```yaml

name: Deploy to VM

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Install SSH client
      run: sudo apt-get install -y openssh-client

    - name: Deploy to VM
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.VM_HOST }}
        username: ${{ secrets.VM_USERNAME }}
        key: ${{ secrets.VM_SSH_KEY }}
        port: 22
        script: |
          cd Cloud_test
          npm install
          sudo lsof -t -i:80 | xargs sudo kill -9 || true
          sudo nohup node index.js > app.log 2>&1 &

Run the api on terminal
```bash
curl http://20.244.91.38/sayHello
{"message":"Hello User"}

Run on browser
http://20.244.91.38/sayHello


