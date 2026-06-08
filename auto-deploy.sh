#!/bin/bash

# Auto Deploy Script
# Tự động commit, push, create PR và merge vào main

set -e

# Màu sắc cho output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Auto Deploy Script${NC}"
echo "================================"

# 1. Check git status
echo -e "\n${BLUE}📋 Checking git status...${NC}"
if [[ -z $(git status -s) ]]; then
    echo -e "${RED}❌ No changes to commit${NC}"
    exit 1
fi

git status -s

# 2. Get commit message
if [ -z "$1" ]; then
    echo -e "\n${BLUE}💬 Enter commit message:${NC}"
    read -r COMMIT_MSG
else
    COMMIT_MSG="$1"
fi

if [ -z "$COMMIT_MSG" ]; then
    echo -e "${RED}❌ Commit message is required${NC}"
    exit 1
fi

# 3. Get current branch or create new one
CURRENT_BRANCH=$(git branch --show-current)
echo -e "\n${BLUE}🌿 Current branch: ${CURRENT_BRANCH}${NC}"

if [ "$CURRENT_BRANCH" = "main" ]; then
    echo -e "${BLUE}Creating new branch...${NC}"
    BRANCH_NAME="auto-deploy-$(date +%s)"
    git checkout -b "$BRANCH_NAME"
    echo -e "${GREEN}✅ Created branch: ${BRANCH_NAME}${NC}"
else
    BRANCH_NAME="$CURRENT_BRANCH"
fi

# 4. Stage and commit
echo -e "\n${BLUE}📦 Staging changes...${NC}"
git add .

echo -e "${BLUE}💾 Creating commit...${NC}"
git commit -m "$COMMIT_MSG"
echo -e "${GREEN}✅ Commit created${NC}"

# 5. Push to remote
echo -e "\n${BLUE}⬆️  Pushing to remote...${NC}"
git push -u origin "$BRANCH_NAME"
echo -e "${GREEN}✅ Pushed to origin/${BRANCH_NAME}${NC}"

# 6. Create PR
echo -e "\n${BLUE}🔀 Creating Pull Request...${NC}"
PR_URL=$(gh pr create --title "$COMMIT_MSG" --body "Auto-generated PR from auto-deploy script" --base main --head "$BRANCH_NAME" 2>&1)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ PR created: ${PR_URL}${NC}"
else
    echo -e "${RED}❌ Failed to create PR${NC}"
    echo "$PR_URL"
    exit 1
fi

# 7. Auto merge
echo -e "\n${BLUE}🔄 Auto merging PR...${NC}"
sleep 2  # Wait a bit for PR to be ready

gh pr merge --merge --auto

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ PR will be merged automatically when checks pass${NC}"
else
    echo -e "${RED}⚠️  Auto merge failed - please merge manually${NC}"
fi

echo -e "\n${GREEN}🎉 Deploy process completed!${NC}"
echo -e "${BLUE}PR URL: ${PR_URL}${NC}"
