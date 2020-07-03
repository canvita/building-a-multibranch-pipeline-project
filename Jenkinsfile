pipeline {
    agent {
        docker {
            image 'node:10.21-alpine' 
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
                sh 'npm run start-server'
            }
        }
    }
}