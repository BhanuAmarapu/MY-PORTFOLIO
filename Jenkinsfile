pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/BhanuAmarapu/MY-PORTFOLIO.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
