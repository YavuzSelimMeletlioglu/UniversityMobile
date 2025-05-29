export type ApiResponse<T = any> = {
    message: string;
    data: T;
    success: boolean
}

export type LoginResponse = {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
    success: boolean
    message: string
};


export type CourseType = {
    id: number;
    code: string;
    name: string;
}

export type CourseDetailsType = {
    id: number;
    code: string;
    name: string;
    lecturer: string | null;
    schedule: string | null;
    text_book: string | null
}

export type UniversityType = {
    address: string,
    contact: string,
    description: string,
    name: string,
    id: number,
    student_count: number
}

export type UniversityDetail = {
    id: number;
    name: string;
    description?: string;
    address?: string;
    phone?: string;
    website?: string;
    logo?: string;
    quota?: number;
};

export type FacultyType = {
    id: number,
    name: string,
    university_id: number
}

export type DepartmentType = {
    dean: string,
    id: number,
    name: string,
    faculty_id: number
    faculty: FacultyType
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