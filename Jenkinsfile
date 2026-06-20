pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }
    environment {
        DOCKER_HUB_USER = "soxnanna"
        BACKEND_IMAGE   = "${DOCKER_HUB_USER}/portfolio-backend"
        FRONTEND_IMAGE  = "${DOCKER_HUB_USER}/portfolio-frontend"
        K8S_NAMESPACE   = "portfolio"
        TF_DIR          = "DevOps/Terraform/terraform-k8s-deploy"
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    credentialsId: 'github_creds',
                    url: 'https://github.com/soxnanna/tout-le-reste-du-projet-fil-rouge.git'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    script {
                        def scannerHome = tool 'sonarqube-scanner'
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        stage('Quality Gate') {
            steps {
                timeout(time: 15, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'docker build --no-cache -t $BACKEND_IMAGE:latest .'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build --no-cache -t $FRONTEND_IMAGE:latest .'
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub_creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push $BACKEND_IMAGE:latest'
                    sh 'docker push $FRONTEND_IMAGE:latest'
                    sh 'docker logout'
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/namespace.yaml'
                sh 'sleep 3'
                sh 'kubectl apply -f k8s/ --validate=false'
                sh 'kubectl rollout restart deployment/backend-deployment -n $K8S_NAMESPACE'
                sh 'kubectl rollout restart deployment/frontend-deployment -n $K8S_NAMESPACE'
                sh 'kubectl rollout status deployment/backend-deployment -n $K8S_NAMESPACE --timeout=300s'
                sh 'kubectl rollout status deployment/frontend-deployment -n $K8S_NAMESPACE --timeout=300s'
            }
        }
        stage('Terraform K8s Deploy') {
            steps {
                dir("${TF_DIR}") {
                    sh 'terraform init'
                    sh """
                        terraform apply -auto-approve \
                            -var="backend_image=${BACKEND_IMAGE}:latest" \
                            -var="frontend_image=${FRONTEND_IMAGE}:latest"
                    """
                }
            }
        }
        stage('Verify Deployment') {
            steps {
                sh 'kubectl get pods -n $K8S_NAMESPACE'
                sh 'kubectl get services -n $K8S_NAMESPACE'
            }
        }
    }
    post {
        success {
            emailext (
                subject: "? SUCCESS: Pipeline ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <h2 style="color:green;">? Pipeline rési !</h2>
                    <p><b>Job :</b> ${env.JOB_NAME}</p>
                    <p><b>Build :</b> #${env.BUILD_NUMBER}</p>
                    <p><b>Duré:</b> ${currentBuild.durationString}</p>
                    <p>SonarQube Quality Gate : Passed ?</p>
                    <p>Images poussé sur Docker Hub ?</p>
                    <p>Déoyéur Kubernetes ?</p>
                    <p><a href="${env.BUILD_URL}">Voir les logs Jenkins</a></p>
                """,
                to: "soxnanna@gmail.com",
                mimeType: 'text/html'
            )
        }
        failure {
            emailext (
                subject: "? FAILURE: Pipeline ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <h2 style="color:red;">? Pipeline éoué</h2>
                    <p><b>Job :</b> ${env.JOB_NAME}</p>
                    <p><b>Build :</b> #${env.BUILD_NUMBER}</p>
                    <p><a href="${env.BUILD_URL}">Voir les logs Jenkins</a></p>
                """,
                to: "soxnanna@gmail.com",
                mimeType: 'text/html'
            )
        }
    }
}
