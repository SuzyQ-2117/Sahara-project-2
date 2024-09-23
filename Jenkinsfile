pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
            
                git 'https://github.com/SuzyQ-2117/Sahara-project-2.git'
            }
        }

        stage('Build Backend - Sahara-back') {
            steps {
                dir('Sahara-back') {
                   
                    sh 'mvn clean install'
                }
            }
        }

        stage('Run Backend - Sahara-back') {
            steps {
                dir('Sahara-back') {
                   
                    sh 'mvn spring-boot:run &'
                }
            }
        }

        stage('Build Backend - Sahara-cart') {
            steps {
                dir('Sahara-cart') {
                 
                    sh 'mvn clean install'
                }
            }
        }

        stage('Run Backend - Sahara-cart') {
            steps {
                dir('Sahara-cart') {
                  
                    sh 'mvn spring-boot:run &'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('Sahara-front') {
                   
                    sh 'npm install'
                }
            }
        }

        stage('Run Frontend') {
            steps {
                dir('Sahara-front') {
                    
                    sh 'npm start &'
                }
            }
        }
    }

    post {
        always {
        
            echo 'Pipeline execution complete'
        }

        success {
          
            echo 'Build and deployment successful!'
        }

        failure {
           
            echo 'Build or deployment failed.'
        }
    }
}
