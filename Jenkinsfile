pipeline {
    agent any
    stages {
        stage('build and install') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.51.0-noble'
                    args '-u root:root'
                }
            }

            steps {
                script {
                    
                    sh 'npm ci'
                    

                    sh 'npx cucumber-js'
                    //sh 'allure generate ./allure-results -o ./allure-report'
                    stash name: 'allure-results', includes: 'allure-results/*'
                   // stash name: 'allure-results', includes: 'allure-results/**', allowEmpty: true
                }
            }
        }
    }
    post {
        always {
            //sh 'ls -al reports/' 

            // cucumber buildStatus: 'UNSTABLE',
            //         failedFeaturesNumber: 1,
            //         failedScenariosNumber: 1,
            //         skippedStepsNumber: 1,
            //         failedStepsNumber: 1,
            //         classifications: [
            //                 [key: 'Commit', value: '<a href="${GERRIT_CHANGE_URL}">${GERRIT_PATCHSET_REVISION}</a>'],
            //                 [key: 'Submitter', value: '${GERRIT_PATCHSET_UPLOADER_NAME}']
            //         ],
            //         reportTitle: 'My report',
            //         fileIncludePattern: 'reports/cucumber-report.json', // Corrige le chemin d'inclusion
            //         sortingMethod: 'ALPHABETICAL',
            //         trendsLimit: 100
           // unstash 'allure-results' //extract results
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