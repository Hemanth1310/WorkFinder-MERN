/*
  Warnings:

  - Added the required column `category` to the `JobPosting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `JobPosting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobType` to the `JobPosting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Experience" AS ENUM ('Experienced', 'Intermediate', 'Begginer');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('Fulltime', 'Internship', 'Freelance');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Software', 'Design', 'Sales', 'Marketing', 'Finance');

-- AlterTable
ALTER TABLE "JobPosting" ADD COLUMN     "category" "Category" NOT NULL,
ADD COLUMN     "experience" "Experience" NOT NULL,
ADD COLUMN     "jobType" "JobType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
