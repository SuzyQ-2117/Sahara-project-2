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
                    bat 'mvn clean install'
                }
            }
        }

        stage('Run Backend - Sahara-back') {
            steps {
                dir('Sahara-back') {
                    bat 'start mvn spring-boot:run'
                }
            }
        }

        stage('Build Backend - Sahara-cart') {
            steps {
                dir('Sahara-cart') {
                    bat 'mvn clean install'
                }
            }
        }

        stage('Run Backend - Sahara-cart') {
            steps {
                dir('Sahara-cart') {
                    bat 'start mvn spring-boot:run'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('Sahara-front') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Frontend') {
            steps {
                dir('Sahara-front') {
                    bat 'start npm start'
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
