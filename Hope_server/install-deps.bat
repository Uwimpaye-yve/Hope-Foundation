@echo off
echo Installing production dependencies...
npm install @nestjs/platform-express multer @types/multer
npm install helmet cors express-rate-limit
npm install bcrypt @types/bcrypt
npm install class-validator class-transformer
echo Dependencies installed successfully!