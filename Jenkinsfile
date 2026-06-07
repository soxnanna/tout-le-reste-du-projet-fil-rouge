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
                sh 'kubectl apply -f k8s/'
                sh 'kubectl rollout restart deployment/backend-deployment -n $K8S_NAMESPACE'
                sh 'kubectl rollout restart deployment/frontend-deployment -n $K8S_NAMESPACE'
                sh 'kubectl rollout status deployment/backend-deployment -n $K8S_NAMESPACE --timeout=120s'
                sh 'kubectl rollout status deployment/frontend-deployment -n $K8S_NAMESPACE --timeout=120s'
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
                    <h2 style="color:green;">? Pipeline réussi !</h2>
                    <p><b>Job :</b> ${env.JOB_NAME}</p>
                    <p><b>Build :</b> #${env.BUILD_NUMBER}</p>
                    <p><b>Durée :</b> ${currentBuild.durationString}</p>
                    <p>SonarQube Quality Gate : Passed ?</p>
                    <p>Images poussées sur Docker Hub ?</p>
                    <p>Déployé sur Kubernetes ?</p>
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
                    <h2 style="color:red;">? Pipeline échoué !</h2>
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
