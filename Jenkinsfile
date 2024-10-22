pipeline {
    agent any
     environment {
        BRANCH_NAME = "${env.GIT_BRANCH}"  // Use Jenkins built-in variable for branch
    }
    stages {
        stage('Pull Code') {
            steps {
                script {
                    echo "Branch: ${BRANCH_NAME}"
                     // Pull from the correct branch (dev or master)
                    if (BRANCH_NAME == 'origin/develop' || BRANCH_NAME == 'origin/master') {
                        git branch: "${BRANCH_NAME.replace('origin/', '')}", url: 'https://github.com/alliance-techfunctionals/CPLBackend.git', credentialsId: 'df3ecd76-8ee1-4a84-989f-bedac9fd38da'
                    } else {
                        error("Unsupported branch: ${BRANCH_NAME}. Exiting...")
                    }
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'sudo npm install'
            }
        }
        stage('Build Application') {
            steps {
                  script {
                    if (BRANCH_NAME == 'origin/develop') {
                        sh 'npm run build-dev'
                    } else {
                        sh 'npm run build-prod'
                    }
                  }
            }
        }
        stage('Deploy Application') {
            steps {
                script {
                  if (BRANCH_NAME == 'origin/develop') {
                      sh 'sudo rm -rf /var/www/testcpl.atf-labs.com/*'
                      sh 'sudo mv dist/* /var/www/testcpl.atf-labs.com/'
                  } else {
                      sh 'sudo rm -rf /var/www/cpl.atf-labs.com.com/*'
                      sh 'sudo mv dist/* /var/www/cpl.atf-labs.com/'
                  }
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}