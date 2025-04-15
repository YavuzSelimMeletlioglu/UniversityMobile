export type CourseType = {
    course_id: number;
    course_code: string;
    course_name: string;
}

export type CourseDetailsType = {
    course_detail_id: number,
    course_id: number,
    lecturer: string,
    schedule: string,
    text_book: string,
    notes: string,
    course_code: string,
    course_name: string
}

export type UniversityType = {
    address: string,
    contact: string,
    description: string,
    name: string,
    university_id: number,
    student_count: number
}

export type FacultyType = {
    faculty_id: number,
    faculty_name: string,
    university_id: number
}

export type DepartmentType = {
    dean: string,
    department_id: number,
    department_name: string,
    faculty_id: number
}

export type MessageListType = {
    name: string;
    receiver_id: number
}

export type MessageType = {
    id: number;
    sender_id: number;
    receiver_id: number,
    message: string;
    send_date: Date;

}