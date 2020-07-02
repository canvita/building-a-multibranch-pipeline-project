pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }  
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
       
         stage('Deliver') {
            steps {
                sh 'npm run build'
                sh 'http-server ./build/'
                sh './jenkins/scripts/kill.sh'
            }
        }
    }
}