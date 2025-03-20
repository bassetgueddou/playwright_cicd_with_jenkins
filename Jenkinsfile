pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['env1', 'env2', 'all', 'ignore'], description: 'Sélectionnez l\'environnement')
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
                    //sh 'mkdir -p reports'
                    sh 'npm ci'
                    
                    if (params.ENVIRONMENT == 'all') {
                        sh 'npx cucumber-js --config cucumber.js --format allure-cucumberjs/reporter'
                    } else if (params.ENVIRONMENT == 'ignore') {
                        sh "TAGS='not @ignore' npx cucumber-js --config cucumber.js --format allure-cucumberjs/reporter"
                    }
                    else {
                        sh "TAGS='@${params.ENVIRONMENT}' npx cucumber-js --config cucumber.js --format allure-cucumberjs/reporter"
                    }
                    //sh 'npx cucumber-js --format json:reports/cucumber-report.json'
                    //sh "npx cucumber-js --tags @${params.ENVIRONMENT} --format json:reports/cucumber-report.json"
                    //sh 'npx cucumber-js'
                    //sh "TAGS='@${params.ENVIRONMENT}' npx cucumber-js --config cucumber.js"
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
