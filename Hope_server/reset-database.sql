-- Drop the existing database
DROP DATABASE IF EXISTS hope_platform;

-- Create a fresh database
CREATE DATABASE hope_platform;

-- Connect to the new database
\c hope_platform;

-- Create uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
