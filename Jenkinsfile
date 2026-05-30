pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }
    environment {
        BACKEND_IMAGE  = "portfolio-backend"
        FRONTEND_IMAGE = "portfolio-frontend"
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
                    sh 'docker build --no-cache -t $BACKEND_IMAGE .'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build --no-cache -t $FRONTEND_IMAGE .'
                }
            }
        }
        stage('Start Containers') {
            steps {
                withCredentials([file(credentialsId: 'portfolio-env', variable: 'ENV_FILE')]) {
                    sh 'docker rm -f portfolio-mongo portfolio-api portfolio-web || true'
                    sh 'docker compose down --remove-orphans'
                    sh 'cp $ENV_FILE .env'
                    sh 'docker compose --env-file .env up -d'
                    sh 'rm -f .env'
                }
            }
        }
        stage('Verify Containers') {
            steps {
                sh 'docker ps'
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
                    <p>SonarQube Quality Gate : Passed</p>
                    <p>Backend + Frontend déployés avec succès.</p>
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
