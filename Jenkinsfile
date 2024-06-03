pipeline {
    agent any
    stages {
        stage("Code"){
            steps{
                git url: "https://github.com/NaufilAsar/gpm-major-project.git", branch: "master"
            }
        }
        stage("Build & test"){
            steps{
                sh "docker build . -t thrifty-frontend"
            }
        }
        stage("Push to repo"){
            steps{
                withCredentials([usernamePassword(credentialsId:"dockerhubid", passwordVariable:"dockerhubidPass", usernameVariable:"dockerhubidUser")]){
                    sh "docker login -u ${env.dockerhubidUser} -p ${env.dockerhubidPass}"
                    sh "docker tag node-api ${env.dockerhubidUser}/thrifty-frontend:latest"
                    sh "docker push ${env.dockerhubidUser}/thrifty-frontend:latest"
                }
                echo "Pushed to docker hub registry"

            }
        }
        stage("Deploy"){
            steps{
                sh "kubectl apply -f Kubernetes/deployment.yaml"
                sh "kubectl apply -f Kubernetes/service.yaml"
                // sh "docker-compose down && docker-compose up -d"
                echo "Deployed via kubernetes"
            }
        }
    }
}
