-- CreateTable
CREATE TABLE "Batch" (
    "batch_id" SERIAL NOT NULL,
    "batch_name" TEXT NOT NULL,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("batch_id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "teacher_id" SERIAL NOT NULL,
    "teacher_name" TEXT NOT NULL,
    "teacher_DOB" TIMESTAMP(3) NOT NULL,
    "teacher_salary" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "working_hours" INTEGER NOT NULL,
    "batch_incharge_id" INTEGER NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "student_id" SERIAL NOT NULL,
    "student_name" TEXT NOT NULL,
    "student_DOB" TIMESTAMP(3) NOT NULL,
    "class" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "school_name" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "_BatchToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Batch_batch_name_key" ON "Batch"("batch_name");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_batch_incharge_id_key" ON "Teacher"("batch_incharge_id");

-- CreateIndex
CREATE UNIQUE INDEX "_BatchToStudent_AB_unique" ON "_BatchToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_BatchToStudent_B_index" ON "_BatchToStudent"("B");

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_batch_incharge_id_fkey" FOREIGN KEY ("batch_incharge_id") REFERENCES "Batch"("batch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchToStudent" ADD CONSTRAINT "_BatchToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Batch"("batch_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BatchToStudent" ADD CONSTRAINT "_BatchToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;
