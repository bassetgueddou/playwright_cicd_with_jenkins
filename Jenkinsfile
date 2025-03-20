pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['int', 'rec'], description: 'Choisir l\'environnement de test')
        string(name: 'TAGS', defaultValue: '@smoke', description: 'Spécifier les tags Cucumber (ex: @smoke,@valid)')
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

                    // Sélection de l’environnement avec --tags
                    def cucumberCommand = "npx cucumber-js --tags '@${params.ENVIRONMENT}' --tags 'not @ignore'"

                    // Ajout des tags supplémentaires si fournis
                    if (params.TAGS?.trim()) {
                        cucumberCommand += " --tags '${params.TAGS}'"
                    }

                    echo "Commande exécutée : ${cucumberCommand}"
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
