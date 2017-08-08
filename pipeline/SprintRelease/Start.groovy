def LIB_BRANCH = "feature/web-ui-release-lib"
library "rackhd-pipline-lib@$LIB_BRANCH"

node {
    checkout scm
    load('./pipeline/SprintRelease/SprintRelease')
}
