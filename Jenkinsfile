pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'staging', 'prod'], description: 'Choisir l\'environnement')
        string(name: 'TAGS', defaultValue: '', description: 'Spécifier les tags Cucumber (ex: @critical,@smoke)')
    }

    stages {
        stage('Build and Install') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.51.0-noble'
                    args '-u root:root'
                }
            }

            steps {
                script {
                    echo "Environnement sélectionné : ${params.ENVIRONMENT}"
                    echo "Tags sélectionnés : ${params.TAGS}"

                    sh 'npm ci'

                    // Exécution des tests avec des tags spécifiques et en fonction de l'environnement
                    def cucumberCommand = "npx cucumber-js"

                    if (params.TAGS?.trim()) {
                        cucumberCommand += " --tags '${params.TAGS}'"
                    }

                    sh cucumberCommand
                    
                    stash name: 'allure-results', includes: 'allure-results/*'
                }
            }
        }
    }

    post {
        always {
            script {
                allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }
}
