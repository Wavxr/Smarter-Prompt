@echo off
echo Building Smarter Prompt Chrome Extension...
npm run build

echo Copying manifest.json to dist folder...
copy public\manifest.json dist\

echo Build completed! The extension is ready in the dist folder.