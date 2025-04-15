pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                url: 'git@gitlab.com:veerwalrahul/save-the-world.git'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building the application...'
                // Add your build commands here
                // sh 'mvn package' or 'npm install' etc.
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add test commands here
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // Add deployment commands here
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed.'
        }
    }
}
