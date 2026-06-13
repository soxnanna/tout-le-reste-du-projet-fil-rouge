pipeline {
    agent any

    environment {
        BACKEND_IMAGE  = "portfolio-backend"
        FRONTEND_IMAGE = "portfolio-frontend"
        DOCKERHUB_USER = "soxnanna"
        SCANNER_HOME   = tool 'SonarQube Scanner'
        K8S_NAMESPACE  = "portfolio"
        TF_DIR         = "DevOps/Terraform/terraform-k8s-deploy"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    credentialsId: 'github_creds',
                    url: 'https://github.com/soxnanna/portfolio-devops.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """
                        ${SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.projectKey=portfolio \
                        -Dsonar.sources=.
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Images') {
            parallel {
                stage('Build Backend') {
                    steps {
                        sh "docker build -t ${BACKEND_IMAGE} ./DevOps/Backend/"
                    }
                }
                stage('Build Frontend') {
                    steps {
                        sh "docker build -t ${FRONTEND_IMAGE} ./DevOps/Frontend/"
                    }
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub_creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh """
                        echo "${DOCKER_PASS}" | docker login -u "${DOCKER_USER}" --password-stdin

                        docker tag ${BACKEND_IMAGE}  ${DOCKERHUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER}
                        docker tag ${BACKEND_IMAGE}  ${DOCKERHUB_USER}/${BACKEND_IMAGE}:latest
                        docker push ${DOCKERHUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER}
                        docker push ${DOCKERHUB_USER}/${BACKEND_IMAGE}:latest

                        docker tag ${FRONTEND_IMAGE} ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER}
                        docker tag ${FRONTEND_IMAGE} ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:latest
                        docker push ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER}
                        docker push ${DOCKERHUB_USER}/${FRONTEND_IMAGE}:latest
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                dir("${TF_DIR}") {
                    sh """
                        terraform init
                        terraform apply -auto-approve \
                            -var="backend_image=${DOCKERHUB_USER}/${BACKEND_IMAGE}:${BUILD_NUMBER}" \
                            -var="frontend_image=${DOCKERHUB_USER}/${FRONTEND_IMAGE}:${BUILD_NUMBER}"
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline termine avec succes - Build #${BUILD_NUMBER} deploye sur Kubernetes"
        }
        failure {
            echo "Pipeline en echec - verifiez les logs"
        }
    }
}
