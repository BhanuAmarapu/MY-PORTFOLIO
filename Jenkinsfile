pipeline {
    agent any

    environment {
        IMAGE_NAME = "amarapubhanuprasad/react-app:latest"
        SERVER_IP = "54.147.24.38"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $IMAGE_NAME
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to Portfolio Server') {
            steps {
                sshagent(credentials: ['portfolio-ssh']) {
                    sh """
ssh -o StrictHostKeyChecking=no ubuntu@${SERVER_IP} '
docker pull ${IMAGE_NAME}

docker stop react-container || true
docker rm react-container || true

docker run -d \
  --name react-container \
  --restart unless-stopped \
  -p 3000:80 \
  ${IMAGE_NAME}
'
"""
                }
            }
        }
    }

    post {
        success {
            echo '========================================='
            echo 'CI/CD Pipeline Completed Successfully'
            echo 'Docker Image Built and Pushed'
            echo 'Application Deployed Successfully'
            echo '========================================='
        }

        failure {
            echo '========================================='
            echo 'Pipeline Failed'
            echo '========================================='
        }
    }
}
