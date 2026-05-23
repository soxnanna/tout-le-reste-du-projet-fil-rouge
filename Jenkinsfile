pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }
    stages {
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
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
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
                    <p>SonarQube Quality Gate : Passed</p>
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
